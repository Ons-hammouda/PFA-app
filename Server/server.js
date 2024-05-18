const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Shop'
});

app.use(session({
    secret: 'Shop',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query(
        'SELECT * FROM users WHERE email = ? AND password = ?', [email, password],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ message: 'User not found.' });
                return;
            }

            const user = results[0];

            res.status(200).json({ message: 'Login successful.', user });
        }
    );
});


app.post('/register', (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    connection.query(
        'SELECT * FROM users WHERE email = ?', [email],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            if (results.length > 0) {
                res.status(400).json({ message: 'User with this email already exists.' });
                return;
            }

            // Set the default role to 2 for new users
            const role = 2;

            connection.query(
                'INSERT INTO users (first_name, last_name, email, password, role_id) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, email, password, role],
                (error, results, fields) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ message: 'An error occurred while processing your request.' });
                        return;
                    }

                    res.status(201).json({ message: 'User registered successfully.' });
                }
            );
        }
    );
});

// SHOP   OWNER

app.get('/products', (req, res) => {
    const { shopOwnerId } = req.query;
    console.log(shopOwnerId);
    connection.query(
        'SELECT * FROM products WHERE ShopOwnerID = ?', [shopOwnerId],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(200).json(results);
        }
    );
});
app.get('/productsall', (req, res) => {
    connection.query(
        'SELECT * FROM products ',
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(200).json(results);
        }
    );
});


app.post('/addProduct', upload.single('image'), (req, res) => {
    const { brand, model, price, serialNumber, color, description, shopOwnerId, quantity, insuranceContractId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    connection.query(
        'INSERT INTO products (Brand, Model, Price, SerialNumber, Color, Description, image, ShopOwnerID, InsuranceContractID, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [brand, model, price, serialNumber, color, description, image, shopOwnerId, insuranceContractId, quantity],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(201).json({ message: 'Product added successfully.' });
        }
    );
});


app.get('/countProducts', (req, res) => {
    connection.query(
        'SELECT COUNT(*) AS totalProducts FROM products',
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(200).json({ totalProducts: results[0].totalProducts });
        }
    );
});
app.get('/countTransactionsByUser/:userId', (req, res) => {
    const { userId } = req.params;

    connection.query(
        'SELECT COUNT(*) AS transactionCount FROM transactions WHERE UserID = ?', [userId],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(200).json(results[0]);
        }
    );
});

app.get('/countClaimsByUser/:userId', (req, res) => {
    const { userId } = req.params;

    connection.query(
        'SELECT COUNT(*) AS claimCount FROM claims WHERE UserID = ?', [userId],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(200).json(results[0]);
        }
    );
});
app.put('/updateProduct/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { brand, model, price, serialNumber, color, description, shopOwnerId, quantity } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    let query = 'UPDATE products SET Brand = ?, Model = ?, Price = ?, SerialNumber = ?, Color = ?, Description = ?, ShopOwnerID = ?,  quantity = ?';
    let values = [brand, model, price, serialNumber, color, description, shopOwnerId, quantity];

    if (image) {
        query += ', image = ?';
        values.push(image);
    }

    query += ' WHERE ProductID = ?';
    values.push(id);

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while processing your request.' });
            return;
        }

        res.status(200).json({ message: 'Product updated successfully.' });
    });
});
app.delete('/deleteProduct/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM products WHERE ProductID = ?', [id], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while processing your request.' });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    });
});
app.post('/addInsuranceContract', (req, res) => {
    const { insuranceType, startDate, endDate, protectedAgainstTheft, firstName, lastName, productID } = req.body;

    connection.query(
        'INSERT INTO insurance_contracts (InsuranceType, StartDate, EndDate, ProtectedAgainstTheft, FirstName, LastName, ProductID) VALUES (?, ?, ?, ?, ?, ?, ?)', [insuranceType, startDate, endDate, protectedAgainstTheft, firstName, lastName, productID],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(201).json({ message: 'Insurance contract added successfully.' });
        }
    );
});

// API endpoint to purchase a product
app.post('/purchaseProduct', (req, res) => {
    const {
        userID,
        productID,
        purchasePrice,
        insuranceTypeID,
        startDate,
        endDate,
        protectedAgainstTheft,
        firstName,
        lastName,
        insuranceType
    } = req.body;

    connection.beginTransaction(async(err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while processing your request.' });
            return;
        }

        try {
            // Insert the insurance contract
            const insuranceContractQuery = `
                INSERT INTO insurance_contracts (InsuranceType, StartDate, EndDate, ProtectedAgainstTheft, FirstName, LastName, ProductID, UserID)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const insuranceContractValues = [insuranceTypeID, startDate, endDate, protectedAgainstTheft, firstName, lastName, productID, userID];

            const [insuranceContractResult] = await connection.promise().query(insuranceContractQuery, insuranceContractValues);
            const insuranceContractID = insuranceContractResult.insertId;

            // Insert the transaction
            const transactionQuery = `
                INSERT INTO transactions (userID, productID, purchaseDate, purchasePrice, insuranceContractID)
                VALUES (?, ?, NOW(), ?, ?)`;
            const transactionValues = [userID, productID, purchasePrice, insuranceContractID];

            await connection.promise().query(transactionQuery, transactionValues);

            // Update the product quantity
            const updateProductQuery = 'UPDATE products SET quantity = quantity - 1 WHERE ProductID = ? AND quantity > 0';
            await connection.promise().query(updateProductQuery, [productID]);

            await connection.promise().commit();
            res.status(201).json({ message: 'Product purchased and insurance contract created successfully.' });
        } catch (error) {
            await connection.promise().rollback();
            console.error(error);
            res.status(500).json({ message: 'An error occurred while processing your request.' });
        }
    });
});


app.post('/createInsuranceContractType', (req, res) => {
    const { userID, label, pricePerDay } = req.body;

    connection.query(
        'INSERT INTO insurance_contract_types (UserID, Label, PricePerDay) VALUES (?, ?, ?)', [userID, label, pricePerDay],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(201).json({ message: 'Insurance contract type created successfully.' });
        }
    );
});

// API endpoint to get all insurance contract types for a specific user
app.get('/insuranceContractTypes', (req, res) => {
    const { userID } = req.query;

    if (!userID) {
        res.status(400).json({ message: 'Missing userID query parameter.' });
        return;
    }

    connection.query(
        'SELECT * FROM insurance_contract_types WHERE UserID = ?', [userID],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while processing your request.' });
                return;
            }

            res.status(200).json(results);
        }
    );
});

app.get('/getInsuranceContractTypes', (req, res) => {
    const { userID } = req.params;

    connection.query(
        'SELECT * FROM insurance_contract_types',
        (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while fetching insurance contract types.' });
                return;
            }

            res.status(200).json(results);
        }
    );
});
app.get('/purchasedProducts/:userID', (req, res) => {
    const { userID } = req.params;

    const query = `
        SELECT p.*, t.purchaseDate, t.purchasePrice, t.insuranceContractID
        FROM products p
        JOIN transactions t ON p.ProductID = t.productID
        WHERE t.userID = ?`;

    connection.query(query, [userID], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching purchased products.' });
            return;
        }

        res.status(200).json(results);
    });
});

app.post('/submitClaim', (req, res) => {
    const { insuranceID, userID, claimDescription, claimType } = req.body;

    if (!['Theft', 'Repair'].includes(claimType)) {
        res.status(400).json({ message: 'Invalid claim type.' });
        return;
    }

    const query = `
        INSERT INTO claims (InsuranceID, UserID, ClaimDate, Status, ClaimDescription, claimType)
        VALUES (?, ?, NOW(), 'Pending', ?, ?)`;

    connection.query(query, [insuranceID, userID, claimDescription, claimType], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while submitting the claim.' });
            return;
        }

        res.status(201).json({ message: 'Claim submitted successfully.' });
    });
});

app.get('/claimsByCompany/:userID', (req, res) => {
    const { userID } = req.params;

    const query = `
        SELECT c.*
        FROM claims c
        JOIN insurance_contracts ic ON c.InsuranceID = ic.ContractID
        WHERE ic.UserID = ?`;

    connection.query(query, [userID], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching claims.' });
            return;
        }

        res.status(200).json(results);
    });
});
app.get('/claims/:userID', (req, res) => {
    const { userID } = req.params;

    const query = `
        SELECT *
        FROM claims
        WHERE UserID = ?`;

    connection.query(query, [userID], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching claims.' });
            return;
        }

        res.status(200).json(results);
    });
});

app.get('/transactionsByShopOwner/:shopOwnerId', (req, res) => {
    const { shopOwnerId } = req.params;

    const query = `
        SELECT t.*, p.Brand, p.Model, p.Price AS productPrice, p.SerialNumber, p.Color, p.Description
        FROM transactions t
        JOIN products p ON t.productID = p.ProductID
        WHERE p.ShopOwnerID = ?`;

    connection.query(query, [shopOwnerId], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching transactions.' });
            return;
        }

        console.log(results); // Log the results to verify the fields
        res.status(200).json(results);
    });
});
















app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
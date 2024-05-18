// src/components/Products.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { getProducts, deleteProduct } from '../../../services/api';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const state = useSelector((state) => state);

    const navigate = useNavigate();

    const shopOwnerId=state.user_id;
    useEffect(() => {
        async function fetchData() {
            if (shopOwnerId) {

                const productData = await getProducts(shopOwnerId);
                setProducts(productData);
                console.log(productData);
            }
        }

        fetchData();
    }, [shopOwnerId]);
    const [expanded, setExpanded] = useState({});

    const toggleDescription = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const getDescription = (description, id) => {
        if (expanded[id] || description.length <= 100) {
            return description;
        }
        return `${description.substring(0, 100)}...`;
    };
    const handleUpdate = (productId) => {
        navigate(`/updateProduct/${productId}`);
    };
    const handleDelete = async (productId) => {
        try {
            const response = await deleteProduct(productId);
            if (response.message === 'Product deleted successfully.') {
                setProducts(products.filter(product => product.ProductID !== productId));
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Box
            id="Support"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >

            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={15} useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Products
                    </Typography>
                    <Grid container spacing={4}>
                        {products.map((product) => (
                            <Grid item key={product.ProductID} xs={12} sm={6} md={4}>

                                <Card>
                                <Button onClick={() => handleDelete(product.ProductID)} style={{ marginLeft: '10px' }}>
                                           Delete
                                        </Button>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image ? `http://localhost:3001${product.image}` : '/placeholder.png'}
                                        alt={product.Model}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.Brand} {product.Model}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            {getDescription(product.Description, product.ProductID)}
                                            {product.Description.length > 100 && (
                                                <Button size="small" onClick={() => toggleDescription(product.ProductID)}>
                                                    {expanded[product.ProductID] ? 'Read Less' : 'Read More'}
                                                </Button>
                                            )}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            ${product.Price}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                        {product.quantity > 0 ? `Quantity: ${product.quantity}` : 'Out of Stock'}
                                        </Typography>
                                        <Button variant="contained" color="primary" onClick={() => handleUpdate(product.ProductID)}>
                                            Update
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
};

export default Products;

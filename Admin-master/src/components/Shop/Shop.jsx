import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from '@mui/material';
import BuyProductModal from './BuyProductModal'; // Import the modal component
import { getALLProducts, postPurchaseProduct, postAddInsuranceContract } from '../../services/api';
import { useSelector } from 'react-redux';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const state = useSelector((state) => state);

  const userId = state.user_id;

  useEffect(() => {
    async function fetchProducts() {
      const data = await getALLProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

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

  const handleBuyNowClick = (product) => {
    if (product.quantity > 0) { // Check if the product is in stock
      setSelectedProduct(product);
      setModalOpen(true);
    } else {
      alert('This product is out of stock and cannot be purchased.');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleModalSubmit = async (formData) => {
    try {
      const { insuranceTypeID, startDate, endDate, protectedAgainstTheft, firstName, lastName, productID, total } = formData;

      // Save insurance contract and purchase transaction
      await postPurchaseProduct({
        userID: userId,
        productID: productID,
        purchasePrice: total,
        insuranceTypeID,
        startDate,
        endDate,
        protectedAgainstTheft,
        firstName,
        lastName
      });

      console.log('Purchase successful');
    } catch (error) {
      console.error('Error during purchase:', error);
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
          <Container>
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={product.ProductID} xs={12} sm={6} md={4}>
                  <Card>
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
                      <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => handleBuyNowClick(product)}>
                        Buy Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Stack>
      </Container>
      {selectedProduct && (
        <BuyProductModal
          open={modalOpen}
          handleClose={handleModalClose}
          product={selectedProduct}
          handleSubmit={handleModalSubmit}
        />
      )}
    </Box>
  );
}

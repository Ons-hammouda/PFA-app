// src/components/UpdateProduct.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { getProductById, updateProduct } from '../../../services/api';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const state = useSelector((state) => state);


    const shopOwnerId=state.user_id;
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        price: '',
        serialNumber: '',
        color: '',
        description: '',
        quantity: '',
        image: null,
        shopOwnerId: shopOwnerId, // Assuming you know the shop owner's ID
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' or 'error'
    });

    useEffect(() => {
        async function fetchProduct() {
            const productData = await getProductById(id);
            setFormData(productData);
        }

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        for (const key in formData) {
            productData.append(key, formData[key]);
        }

        try {
            const response = await updateProduct(id, productData);
            console.log(response);
            if (response && response.message === 'Product updated successfully.') {
                setSnackbar({
                    open: true,
                    message: 'Product updated successfully!',
                    severity: 'success',
                });
                setTimeout(function() {
                    navigate('/Dashboard-Owner');
                }, 2000);
            } else {
                setSnackbar({
                    open: true,
                    message: 'An error occurred while updating the product. Please try again.',
                    severity: 'error',
                });
            }
        } catch (error) {
            console.error(error);
            setSnackbar({
                open: true,
                message: 'An error occurred while updating the product. Please try again.',
                severity: 'error',
            });
        }
    };
    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        });
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
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Update Product
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Brand"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Model"
                                            name="model"
                                            value={formData.model}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Price"
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Serial Number"
                                            name="serialNumber"
                                            value={formData.serialNumber}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Color"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Quantity"
                                            name="quantity"
                                            type="number"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            fullWidth
                                            multiline
                                            rows={4}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleFileChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary">
                                            Update Product
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdateProduct;

// src/components/Create.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { createInsuranceContractType } from '../../../services/api';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';

const Create = () => {
    const state = useSelector((state) => state);
    const companyID = state.user_id; // Assuming user_id is the company ID

    const [formData, setFormData] = useState({
        label: '',
        pricePerDay: '',
        userID: companyID
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' or 'error'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createInsuranceContractType(formData);
            console.log(response);
            if (response) {
                setSnackbar({
                    open: true,
                    message: 'Insurance Contract added successfully!',
                    severity: 'success',
                });
            }
        } catch (error) {
            console.error(error);
            setSnackbar({
                open: true,
                message: 'An error occurred while adding the Insurance Contract. Please try again.',
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
                                Add Insurance Contract
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Label"
                                            name="label"
                                            value={formData.label}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Price Per Day"
                                            name="pricePerDay"
                                            type="number"
                                            value={formData.pricePerDay}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary">
                                            Add Insurance Contract
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        </Box>
    );
};

export default Create;

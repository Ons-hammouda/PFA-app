import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { getInsuranceContractTypes } from '../../services/api';
import { useSelector } from 'react-redux';

const BuyProductModal = ({ open, handleClose, product, handleSubmit }) => {
    const state = useSelector((state) => state);
    const userID = state.user_id;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        insuranceTypeID: '',
        startDate: '',
        endDate: '',
        protectedAgainstTheft: false,
    });

    const [insuranceOptions, setInsuranceOptions] = useState([]);

    useEffect(() => {
        async function fetchInsuranceContractTypes() {
            try {
                const data = await getInsuranceContractTypes(userID);
                setInsuranceOptions(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching insurance contract types:', error);
            }
        }

        fetchInsuranceContractTypes();
    }, [userID]);

    const calculateTotal = () => {
        const { insuranceTypeID, startDate, endDate } = formData;
        const productPrice = parseFloat(product.Price); // Ensure product price is a number
        const insurance = insuranceOptions.find(opt => opt.ContractTypeID === parseInt(insuranceTypeID));
        if (!insurance || !startDate || !endDate) return productPrice.toFixed(2);

        const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        const insuranceCost = days * insurance.PricePerDay;

        const total = productPrice + insuranceCost;
        return total.toFixed(2); // Ensure the total is formatted to 2 decimal places
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFormSubmit = () => {
        const total = calculateTotal();
        const insuranceType = insuranceOptions.find(opt => opt.ContractTypeID === parseInt(formData.insuranceTypeID)).Label;
        handleSubmit({
            ...formData,
            productID: product.ProductID,
            total,
            userID,
            insuranceType
        });
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h6" component="h2">
                    Buy {product.Brand} {product.Model}
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Insurance Type"
                    name="insuranceTypeID"
                    value={formData.insuranceTypeID}
                    onChange={handleChange}
                >
                    {insuranceOptions.map(option => (
                        <MenuItem key={option.ContractTypeID} value={option.ContractTypeID}>
                            {option.Label} (${option.PricePerDay}/day)
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    margin="normal"
                    type="date"
                    label="Start Date"
                    name="startDate"
                    InputLabelProps={{ shrink: true }}
                    value={formData.startDate}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="date"
                    label="End Date"
                    name="endDate"
                    InputLabelProps={{ shrink: true }}
                    value={formData.endDate}
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.protectedAgainstTheft}
                            onChange={handleChange}
                            name="protectedAgainstTheft"
                        />
                    }
                    label="Protect Against Theft"
                />
                <Typography variant="h6" component="div" marginTop="20px">
                    Total: ${calculateTotal()}
                </Typography>
                <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit} style={{ marginTop: '10px' }}>
                    Buy Now
                </Button>
            </Box>
        </Modal>
    );
};

export default BuyProductModal;

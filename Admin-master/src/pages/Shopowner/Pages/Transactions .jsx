import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTransactionsByShopOwner } from '../../../services/api';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const state = useSelector((state) => state);
    const shopOwnerId = state.user_id;

    useEffect(() => {
        async function fetchTransactions() {
            const data = await getTransactionsByShopOwner(shopOwnerId);
            setTransactions(data);
            console.log(data);
        }

        fetchTransactions();
    }, [shopOwnerId]);
    const formatDate = (dateString) => {
        console.log("Received date string:", dateString);
        const date = new Date(dateString);
        console.log("Parsed date object:", date);

        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
                    <Typography variant="h4" gutterBottom>
                        Transactions
                    </Typography>
                    <Grid container spacing={4}>
                        {transactions.map((transaction) => (
                            <Grid item key={transaction.transactionID} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">
                                            Transaction ID: {transaction.transactionID}
                                        </Typography>
                                        <Typography variant="body2">
                                            Product: {transaction.Brand} {transaction.Model}
                                        </Typography>
                                        <Typography variant="body2">
                                            Serial Number: {transaction.SerialNumber}
                                        </Typography>
                                        <Typography variant="body2">
                                            Color: {transaction.Color}
                                        </Typography>
                                        <Typography variant="body2">
                                            Description: {transaction.Description}
                                        </Typography>
                                        <Typography variant="body2">
                                        Purchase Date: {formatDate(transaction.PurchaseDate)}
                                        </Typography>
                                        <Typography variant="body2">
                                            Price: ${transaction.PurchasePrice}
                                        </Typography>
                                        <Typography variant="body2">
                                            Insurance Contract ID: {transaction.insuranceContractID}
                                        </Typography>
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

export default Transactions;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPurchasedProducts, submitClaim } from '../../services/api';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container, Grid, Card,CardMedia, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
const PurchasedProducts = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [claimDescription, setClaimDescription] = useState('');
    const [claimType, setClaimType] = useState('');
    const state = useSelector((state) => state);
    const userID = state.user_id;

    useEffect(() => {
        async function fetchProducts() {
            const data = await getPurchasedProducts(userID);
            setProducts(data);
        }

        fetchProducts();
    }, [userID]);

    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
        setClaimDescription('');
        setClaimType('');
    };

    const handleSubmitClaim = async () => {
        if (selectedProduct) {
            await submitClaim({
                insuranceID: selectedProduct.insuranceContractID,
                userID: userID,
                claimDescription: claimDescription,
                claimType: claimType
            });
            handleClose();
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
                Purchased Products
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
                                <Typography variant="h5">
                                    {product.Brand} {product.Model}
                                </Typography>
                                <Typography variant="body2">
                                    Purchase Date: {product.purchaseDate}
                                </Typography>
                                <Typography variant="body2">
                                    Price: ${product.purchasePrice}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={() => handleOpen(product)}>
                                    Submit Claim
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Submit Claim</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Claim Description"
                        type="text"
                        fullWidth
                        value={claimDescription}
                        onChange={(e) => setClaimDescription(e.target.value)}
                    />
                           <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Claim Type"
                        name="claimType"
                        value={claimType}
                        onChange={(e) => setClaimType(e.target.value)}
                    >
                        <MenuItem value="Theft">Theft</MenuItem>
                        <MenuItem value="Repair">Repair</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitClaim} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
        </Stack>
      </Container>

    </Box>
    );
};

export default PurchasedProducts;

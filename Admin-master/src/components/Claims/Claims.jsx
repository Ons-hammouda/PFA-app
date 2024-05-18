import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getClaims } from '../../services/api';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const Claims = () => {
    const [claims, setClaims] = useState([]);
    const state = useSelector((state) => state);
    const userID = state.user_id;

    useEffect(() => {
        async function fetchClaims() {
            const data = await getClaims(userID);
            setClaims(data);
        }

        fetchClaims();
    }, [userID]);

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
                        My Claims
                    </Typography>
                    <Grid container spacing={4}>
                        {claims.map((claim) => (
                            <Grid item key={claim.ClaimID} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">
                                            Claim ID: {claim.ClaimID}
                                        </Typography>
                                        <Typography variant="body2">
                                            Insurance ID: {claim.InsuranceID}
                                        </Typography>
                                        <Typography variant="body2">
                                            Claim Date: {claim.ClaimDate}
                                        </Typography>
                                        <Typography variant="body2">
                                            Status: {claim.Status}
                                        </Typography>
                                        <Typography variant="body2">
                                            Description: {claim.ClaimDescription}
                                        </Typography>
                                        <Typography variant="body2">
                                            Type: {claim.claimType}
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

export default Claims;

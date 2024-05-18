import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CountCard from './Components/User';
import { getCountTransactionsByUser, getCountClaimsByUser } from '../../services/api'; // Import your API functions
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const [transactionCount, setTransactionCount] = useState(0);
  const [claimCount, setClaimCount] = useState(0);
  const state = useSelector((state) => state);
  const userId=state.user_id;

  useEffect(() => {
    async function fetchCounts() {
      try {
        const transactionsData = await getCountTransactionsByUser(userId);
        const claimsData = await getCountClaimsByUser(userId);
       setTransactionCount(transactionsData.transactionCount);
        setClaimCount(claimsData.claimCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCounts();
  }, []);

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
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
        <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={5}>
            <CountCard title="Transactions" count={transactionCount} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <CountCard title="Claims" count={claimCount} />
            </Grid>

          </Grid>
        </Stack>
        {/* <ChartComponent/> */}
      </Container>
    </Box>
  );
}

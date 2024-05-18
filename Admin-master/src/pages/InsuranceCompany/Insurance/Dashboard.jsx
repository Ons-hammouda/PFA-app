// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getCountProducts, getProducts, getTransactions } from '../../../services/api';
import Header from './Header';
import PropTypes from 'prop-types';
import getLPTheme from '../../getLPTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Create from './Create';
function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
    // Assuming setToken is a selector, adjust the import if it's not

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          position: 'fixed',
          bottom: 24,
        }}
      >
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={showCustomTheme}
          onChange={toggleCustomTheme}
          aria-label="Platform"
          sx={{
            backgroundColor: 'background.default',
            '& .Mui-selected': {
              pointerEvents: 'none',
            },
          }}
        >
          <ToggleButton value>
            <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
            Custom theme
          </ToggleButton>
          <ToggleButton value={false}>Material Design 2</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    );
  }

  ToggleCustomTheme.propTypes = {
    showCustomTheme: PropTypes.bool.isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
  };

const DashboardCompnay = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [mode, setMode] = useState('light');
    const [showCustomTheme, setShowCustomTheme] = useState(true);
    const [selectedMenuItem, setSelectedMenuItem] = useState('Create');



    const toggleColorMode = () => {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const handleMenuItemClick = (menuItem) => {
      setSelectedMenuItem(menuItem);
    };
    useEffect(() => {
        async function fetchData() {
            const countData = await getCountProducts();
            setTotalProducts(countData.totalProducts);

            const productData = await getProducts();
            setProducts(productData);

            const transactionData = await getTransactions();
            setTransactions(transactionData);
        }

        fetchData();
    }, []);

    return (
        <ThemeProvider theme={createTheme(getLPTheme(mode))}>
        <CssBaseline />
        <Header mode={mode} toggleColorMode={toggleColorMode} handleMenuItemClick={handleMenuItemClick} />
        <Box sx={{ bgcolor: 'background.default' }}>
          <Divider />
          {selectedMenuItem === 'Create' && < Create/>}


          <Divider />
          {/* <Footer /> */}
        </Box>
      </ThemeProvider>

    );
};

export default DashboardCompnay;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getLPTheme from '../pages/getLPTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Header from './Header';
 import Dashbored from './Dashbored/Dashbored'; // Corrected import
import Shop from './Shop/Shop'; // Corrected import
import Claims from './Claims/Claims'; // Corrected import
import PurchasedProducts from './PurchasedProducts/PurchasedProducts'; // Corrected import




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

export default function Home() {
  const [mode, setMode] = useState('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');



  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <ThemeProvider theme={createTheme(getLPTheme(mode))}>
      <CssBaseline />
      <Header mode={mode} toggleColorMode={toggleColorMode} handleMenuItemClick={handleMenuItemClick} />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        {selectedMenuItem === 'dashboard' && < Dashbored/>}
        {selectedMenuItem === 'Shop' && <Shop/>}
        {selectedMenuItem === 'Claims' && <Claims/>}
        {selectedMenuItem === 'Purchased' && <PurchasedProducts/>}




        <Divider />
        {/* <Footer /> */}
      </Box>
    </ThemeProvider>
  );
}

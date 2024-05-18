import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import { logout } from '../../../services/store/reducers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Header({ mode, toggleColorMode, handleMenuItemClick }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');

  };
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">

          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
         <Box
  sx={{
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    ml: '-18px',
    px: 0,
  }}
>
  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  <Button onClick={() => handleMenuItemClick('Create')}>Create</Button> {/* Add Logout button */}

      <Button onClick={() => handleMenuItemClick('products')}>products</Button> {/* Add Logout button */}


    <Button onClick={() => handleMenuItemClick('Transactions')}>Transactions</Button> {/* Add Logout button */}


  </Box>
</Box>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <Button onClick={() => handleMenuItemClick('Profile')}>Profile</Button> {/* Add Logout button */}


              <Button onClick={handleLogout}>Logout</Button> {/* Add Logout button */}
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />

              </Button>

              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>

                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >

                  <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem', // Adjust as needed
      }}
    >
      <Button onClick={handleLogout}>Logout</Button>
      <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

    </Box>
                  <MenuItem sx={{ py: '6px' }} onClick={() => handleMenuItemClick('dashboard')}>
                    Dashboard
                  </MenuItem>
                  <MenuItem sx={{ py: '6px' }} onClick={() => handleMenuItemClick('support')}>
                    Support Tickets
                  </MenuItem>
                  <MenuItem sx={{ py: '6px' }} onClick={() => handleMenuItemClick('Accounts')}>
                    Accounts
                  </MenuItem>
                  <Divider />
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;

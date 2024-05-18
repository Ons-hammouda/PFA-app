import React, { useState } from 'react';
import  { useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Loading from './Loading';
import { postLogin } from '../services/api'; // Import your API function here
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../services/store/reducers'; // Import your action creator here
import { logout } from '../services/store/reducers';

import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch logout action when the component mounts or updates
    dispatch(logout());

    return () => {
    };
  }, [dispatch]);
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await postLogin(values.email, values.password);

      if (response && response.user) {
        setIsLoading(false);
        dispatch(loginSuccess(response.user));
        if (response.user.role_id === 5) {
          navigate('/Dashboard-Owner');
        }

        if (response.user.role_id === 6) {
          navigate('/Dashboard-Compnay');
        }
        else if (response.user.role_id === 2) {
          navigate('/Dashboard');
        } else {
          setError('Invalid role');
          setSnackbarErrorOpen(true);
        }
      } else {
        setError('Invalid email or password');
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Network error. Please try again.');
      setSnackbarErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarErrorClose = () => {
    setSnackbarErrorOpen(false);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange('email')}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={values.password}
              onChange={handleChange('password')}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Loading isLoading={isLoading} />
            <Snackbar
        open={snackbarErrorOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarErrorClose}
      >
        <SnackbarContent


          message="Error Login"
          action={
            <Button color="secondary" size="small" onClick={handleSnackbarErrorClose}>
              Close
            </Button>
          }
        />
      </Snackbar>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

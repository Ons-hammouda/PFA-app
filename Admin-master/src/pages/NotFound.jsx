import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Box p={4} boxShadow={3} borderRadius={16} bgcolor="#ffffff" color="#333333">
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: '#666', marginBottom: '20px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          style={{ borderRadius: '25px', padding: '10px 30px', fontSize: '1.2rem' }}
        >
          Go to Home
        </Button>
      </Box>
      <Typography variant="body2" style={{ marginTop: '20px', color: '#999' }}>
        If you believe this is a mistake, please contact support.
      </Typography>
    </Container>
  );
};

export default NotFoundPage;

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6">Shop</Typography>
              <Typography variant="body2" mt={1}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6">Quick Links</Typography>
              <Stack mt={1} spacing={1}>
                <Link color="inherit" href="#">
                  Home
                </Link>
                <Link color="inherit" href="#">
                  About Us
                </Link>
                <Link color="inherit" href="#">
                  Services
                </Link>
                <Link color="inherit" href="#">
                  Contact Us
                </Link>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6">Connect With Us</Typography>
              <Stack direction="row" mt={1} spacing={2}>
                <IconButton size="small">
                  <FacebookIcon />
                </IconButton>
                <IconButton size="small">
                  <TwitterIcon />
                </IconButton>
                <IconButton size="small">
                  <LinkedInIcon />
                </IconButton>
                <IconButton size="small">
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

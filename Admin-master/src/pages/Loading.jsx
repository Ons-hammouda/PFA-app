import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const Loading = ({ isLoading }) => {
  return isLoading ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={70} />
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
        Logging In...
      </Typography>
    </div>
  ) : null;
};

export default Loading;

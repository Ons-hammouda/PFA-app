import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CountCard = ({ title, count }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="h4" component="h2">
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CountCard;

import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '100wh',
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: '#ff6b6b',
            marginBottom: '1rem',
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '1.5rem',
          }}
        >
          Oops! Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '2rem',
          }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff6b6b',
            color: 'white',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#ff5252',
            },
          }}
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
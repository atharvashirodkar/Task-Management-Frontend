import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { changePassword, getUser } from '../services/authService';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      const response = await getUser();
      const userData = {
        email: response.email,
        password: formData.password,
        newPassword: formData.newPassword,
      };
      await changePassword(userData);
      setSuccess('Password changed successfully!');
      setTimeout(() => navigate('/profile'), 2000); // Redirect to profile page after success
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change password. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Change Password
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Current Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Change Password
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;
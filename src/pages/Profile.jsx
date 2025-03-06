// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Button, Box, Avatar } from "@mui/material";
import { getUser } from "../services/authService";
import moment from "moment";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUser();
        console.log(response);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography variant="h6" color="error" align="center" mt={5}>
        No user data found.
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ maxWidth: 500, width: "100%", borderRadius: 3, boxShadow: 3, display: 'flex', justifyContent: 'center' }}>
        <CardContent sx={{ textAlign: "left", p: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              mb: 3,
              backgroundColor: "primary.main",
              fontSize: "2.5rem",
            }}
          >
            {user.first_name[0]}
          </Avatar>

          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "text.primary" }}>
            {user.first_name} {user.middle_name} {user.last_name}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
            <strong>Date of Birth:</strong> {moment(user.dob).format("DD-MM-YYYY")}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
            <strong>Gender:</strong> {user.gender}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
            <strong>Address:</strong> {user.address}
          </Typography>

          <Button
            variant="contained"
            href={`/profile/edit`}
            sx={{
              mt: 2,
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
              borderRadius: 2,
              padding: "10px 20px",
              fontSize: "1rem",
              textTransform: "none",
              display: "block",
            }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
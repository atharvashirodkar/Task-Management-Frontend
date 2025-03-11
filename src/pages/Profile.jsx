// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Button, Box, Avatar } from "@mui/material";
import { getUser } from "../services/authService";
import moment from "moment";
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUser();
        // console.log(response);
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
      sx={{minHeight: "75vh", p: 3 }}
    >
      <Card
        sx={{
          width: "70%",
          maxWidth: 600,
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "background.paper",
        }}
      >
        <CardContent sx={{ textAlign: "left", p: 4, width: "100%" }}>
          {/* Avatar with Gradient */}
          <Avatar
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              mb: 3,
              background: "linear-gradient(45deg, primary.main, secondary.main)",
              fontSize: "2.5rem",
              color: "white",
              border: "2px solid white",
              boxShadow: 2,
            }}
          >
            {user.first_name[0]}
          </Avatar>
          
          {/* User Details */}
          <Typography sx={{ fontWeight: "bold", color: "text.primary", fontSize: "1.5rem", mb: 2 }}>
            <strong>Name:</strong> {user.first_name} {user.middle_name} {user.last_name}
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

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              href={`/profile/edit`}
              startIcon={<EditIcon />}
              sx={{
                mt: 2,
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark", transform: "scale(1.05)" },
                borderRadius: 2,
                padding: "10px 20px",
                fontSize: "1rem",
                textTransform: "none",
                transition: "transform 0.2s",
              }}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              href={`/change-password`}
              startIcon={<LockIcon />}
              sx={{
                mt: 2,
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark", transform: "scale(1.05)" },
                borderRadius: 2,
                padding: "10px 20px",
                fontSize: "1rem",
                textTransform: "none",
                transition: "transform 0.2s",
              }}
            >
              Change Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
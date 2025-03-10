import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsAuthenticated(!!token);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("user");
      const refreshToken = token.refreshToken;
      const response = await logout(refreshToken);
      if (response) {
        localStorage.removeItem("user");
      }
      navigate("/login");
      window.location.reload();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
    // handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2, width: '100vw' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Task Management
          </Typography>

          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                Profile
              </Button>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
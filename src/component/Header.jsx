import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}>
            Task Management
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "auto",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 2),
  width: "20ch",
}));

const AppBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  return (
    <MuiAppBar position="static">
      <Toolbar>
        {/* Menu Button */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>

        {/* Menu Dropdown */}
        <Menu anchorEl={anchorEl} open={open} onClose={() => handleMenuClose()}>
          <MenuItem onClick={() => handleMenuClose("/")}>Home</MenuItem>
          <MenuItem onClick={() => handleMenuClose("/add-product")}>Add Product</MenuItem>
          <MenuItem onClick={() => handleMenuClose("/orders")}>Order Details</MenuItem>
          <MenuItem onClick={() => handleMenuClose("/profile")}>Profile</MenuItem>
        </Menu>

        {/* Title */}
        <Typography variant="h6" noWrap component="div">
          E-Shop
        </Typography>

        {/* Search */}
        <Search>
          <SearchInput
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </Search>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Home Icon */}
        <IconButton color="inherit" onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>

        {/* Login/Signup */}
        <Button color="inherit" onClick={() => navigate("/login")} sx={{ ml: 1 }}>
          Login
        </Button>
        <Button color="inherit" onClick={() => navigate("/signup")} sx={{ ml: 1 }}>
          Signup
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;

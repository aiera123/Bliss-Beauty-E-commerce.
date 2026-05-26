import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: alpha("#fff", 0.15),
  "&:hover": {
    backgroundColor: alpha("#fff", 0.25),
  },
  width: "100%",
  maxWidth: 500,
}));

const SearchIconWrapper = styled("div")({
  padding: "0 12px",
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledInputBase = styled(InputBase)({
  color: "inherit",
  width: "100%",
  paddingLeft: "40px",
});

export default function SearchAppBar({ search, setSearch }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#1976d2" }}>
        <Toolbar>

          {/* LEFT - MENU + BRAND */}
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mr: 3 }}
          >
            Bliss & Beauty 
          </Typography>

          {/* CENTER - SEARCH */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
          </Box>

          {/* RIGHT - ICONS */}
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>

          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
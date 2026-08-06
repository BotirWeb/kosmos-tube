import { Box, IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../../constants/logo.svg";
import { SearchBar } from "../";
import { useColorMode } from "../../theme/color-mode-context";

const Navbar = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: 1,
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 2,
        p: 2,
      }}
    >
      <Link to="/" style={{ display: "flex" }}>
        <img src={logo} alt="logo" width={50} height={35} />
      </Link>

      <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
        <SearchBar />
      </Box>

      <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
        <IconButton onClick={toggleColorMode} aria-label="Toggle color mode">
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Navbar;

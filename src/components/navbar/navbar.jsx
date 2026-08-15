import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../../constants/logo.svg";
import { SearchBar } from "../";
import { useColorMode } from "../../theme/color-mode-context";
import { glassSx, gradientTextSx, cosmicGlow } from "../../theme/cosmic";

const Navbar = () => {
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        ...glassSx(mode),
        ...(!isDark && { boxShadow: 1 }),
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 2,
        p: 2,
      }}
    >
      <Stack
        component={Link}
        to="/"
        direction="row"
        alignItems="center"
        gap={1.2}
        sx={{ textDecoration: "none" }}
      >
        <img src={logo} alt="logo" width={38} height={27} />
        <Typography
          variant="subtitle1"
          fontWeight={800}
          sx={{
            whiteSpace: "nowrap",
            ...(isDark ? gradientTextSx : { color: "text.primary" }),
          }}
        >
          Kosmos Tube
        </Typography>
      </Stack>

      <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
        <SearchBar />
      </Box>

      <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
          sx={
            isDark
              ? {
                  color: "#fff",
                  boxShadow: `0 0 14px ${cosmicGlow.purple}`,
                  transition: "box-shadow .2s ease",
                  "&:hover": { boxShadow: `0 0 22px ${cosmicGlow.purple}` },
                }
              : undefined
          }
        >
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Navbar;

import { Box, Stack, Typography } from "@mui/material";
import { useColorMode } from "../../theme/color-mode-context";

const Footer = () => {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? "rgba(255,255,255,0.045)" : "background.paper",
        backdropFilter: isDark ? "blur(16px)" : "none",
        WebkitBackdropFilter: isDark ? "blur(16px)" : "none",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 3,
        px: 2,
        mt: 4,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        sx={{ maxWidth: "1200px", mx: "auto" }}
      >
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} Kosmos Tube
        </Typography>
        <Stack direction="row" gap={2}>
          <Typography
            component="a"
            href="https://kosmos-tube.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
            sx={{
              opacity: 0.7,
              "&:hover": { opacity: 1, color: "primary.main" },
            }}
          >
            Live demo
          </Typography>
          <Typography
            component="a"
            href="https://github.com/BotirWeb/kosmos-tube"
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
            sx={{
              opacity: 0.7,
              "&:hover": { opacity: 1, color: "primary.main" },
            }}
          >
            GitHub
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;

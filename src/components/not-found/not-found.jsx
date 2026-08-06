import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from "../../constants/colors";

const NotFound = () => {
  return (
    <Box minHeight="90vh">
      <Stack
        justifyContent="center"
        alignItems="center"
        height="90vh"
        gap={2}
        px={2}
        textAlign="center"
      >
        <Typography variant="h2" fontWeight="bold" color={colors.secondary}>
          404
        </Typography>
        <Typography variant="h6">
          This page doesn&apos;t exist.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ background: colors.secondary, mt: 1 }}
        >
          Back to home
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;

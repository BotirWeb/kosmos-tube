import { Card, CardContent, Skeleton, Stack } from "@mui/material";
import { useColorMode } from "../../theme/color-mode-context";
import { glassSx } from "../../theme/cosmic";

const VideoCardSkeleton = () => {
  const { mode } = useColorMode();

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        ...glassSx(mode),
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", aspectRatio: "16 / 9" }}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Skeleton variant="text" width="30%" sx={{ my: "5px" }} />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={"8px"}
          mt={"auto"}
          pt={"10px"}
        >
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width="40%" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VideoCardSkeleton;

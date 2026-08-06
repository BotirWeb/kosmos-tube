import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const RelatedVideoCard = ({ video }) => {
  const { snippet } = video ?? {};
  const videoId = video?.id?.videoId;

  return (
    <Link to={`/video/${videoId}`}>
      <Stack direction={"row"} gap={"10px"}>
        <Box
          component="img"
          src={snippet?.thumbnails?.medium?.url ?? snippet?.thumbnails?.high?.url}
          alt={snippet?.title ?? "Video thumbnail"}
          sx={{
            width: "168px",
            flexShrink: 0,
            aspectRatio: "16 / 9",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" fontWeight="bold" sx={clamp(2)}>
            {snippet?.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{ opacity: 0.6, display: "block", mt: "4px" }}
          >
            {snippet?.channelTitle}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            {snippet?.publishedAt && moment(snippet.publishedAt).fromNow()}
          </Typography>
        </Box>
      </Stack>
    </Link>
  );
};

export const RelatedVideoCardSkeleton = () => (
  <Stack direction={"row"} gap={"10px"}>
    <Skeleton
      variant="rectangular"
      sx={{ width: "168px", flexShrink: 0, aspectRatio: "16 / 9", borderRadius: 1 }}
    />
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="40%" />
    </Box>
  </Stack>
);

export default RelatedVideoCard;

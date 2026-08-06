import { Stack, Box, Typography } from "@mui/material";
import { SearchOff, ErrorOutline } from "@mui/icons-material";
import { VideoCard, ChannelCard } from "..";
import VideoCardSkeleton from "../video-card/video-card-skeleton";

const gridSx = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 2,
  alignItems: "start",
};

const Message = ({ icon, title, hint }) => (
  <Stack
    width="100%"
    minHeight="40vh"
    justifyContent="center"
    alignItems="center"
    gap={1}
    sx={{ opacity: 0.6 }}
  >
    {icon}
    <Typography variant="h6">{title}</Typography>
    {hint && <Typography variant="body2">{hint}</Typography>}
  </Stack>
);

const Videos = ({ videos, isLoading, error }) => {
  if (isLoading) {
    return (
      <Box sx={gridSx}>
        {Array.from({ length: 8 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Message
        icon={<ErrorOutline fontSize="large" />}
        title="Something went wrong"
        hint={error}
      />
    );
  }

  if (!videos?.length) {
    return (
      <Message
        icon={<SearchOff fontSize="large" />}
        title="No videos found"
        hint="Try a different search or category."
      />
    );
  }

  return (
    <Box sx={gridSx}>
      {videos.map((item) => (
        <Box key={item?.id?.videoId || item?.id?.channelId || item?.etag}>
          {item?.id?.videoId && <VideoCard video={item} />}
          {item?.id?.channelId && <ChannelCard video={item} />}
        </Box>
      ))}
    </Box>
  );
};

export default Videos;

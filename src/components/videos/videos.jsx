import { useEffect, useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { SearchOff, ErrorOutline } from "@mui/icons-material";
import { VideoCard, ChannelCard } from "..";
import VideoCardSkeleton from "../video-card/video-card-skeleton";
import { ApiService } from "../../service/api.service";

const gridSx = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 2,
  alignItems: "start",
};

// Search results only carry the video's own thumbnail, not the uploading
// channel's avatar, so we batch-fetch channel avatars separately and cache
// them for the session to avoid re-fetching channels we've already seen.
const avatarCache = {};

const useChannelAvatars = (videos) => {
  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    const channelIds = [
      ...new Set(
        (videos ?? [])
          .filter((item) => item?.id?.videoId)
          .map((item) => item?.snippet?.channelId)
          .filter(Boolean)
      ),
    ];

    if (!channelIds.length) return;

    const applyFromCache = () => {
      const next = {};
      channelIds.forEach((id) => {
        if (avatarCache[id]) next[id] = avatarCache[id];
      });
      setAvatars(next);
    };

    const uncachedIds = channelIds.filter((id) => !(id in avatarCache));
    if (!uncachedIds.length) {
      applyFromCache();
      return;
    }

    let cancelled = false;

    const fetchAvatars = async () => {
      try {
        const data = await ApiService.fetching(
          `channels?part=snippet&id=${uncachedIds.join(",")}`
        );
        (data?.items ?? []).forEach((item) => {
          avatarCache[item.id] = item?.snippet?.thumbnails?.default?.url ?? null;
        });
      } catch {
        // Ignore — VideoCard falls back to the channel-initial avatar.
      } finally {
        if (!cancelled) applyFromCache();
      }
    };

    fetchAvatars();

    return () => {
      cancelled = true;
    };
  }, [videos]);

  return avatars;
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
  const channelAvatars = useChannelAvatars(videos);

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
          {item?.id?.videoId && (
            <VideoCard
              video={item}
              avatarUrl={channelAvatars[item?.snippet?.channelId]}
            />
          )}
          {item?.id?.channelId && <ChannelCard video={item} />}
        </Box>
      ))}
    </Box>
  );
};

export default Videos;

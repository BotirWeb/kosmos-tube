import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiService } from "../../service/api.service";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import {
  CheckCircle,
  FavoriteOutlined,
  MarkChatRead,
  Tag,
  Visibility,
} from "@mui/icons-material";
import { Loader } from "../";
import RelatedVideoCard, {
  RelatedVideoCardSkeleton,
} from "../video-card/related-video-card";
import { useColorMode } from "../../theme/color-mode-context";
import { cosmicGlow } from "../../theme/cosmic";

const formatCount = (value) =>
  value === undefined || value === null
    ? "—"
    : parseInt(value, 10).toLocaleString("en-US");

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const DESCRIPTION_CLAMP_THRESHOLD = 220;

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);
  const [error, setError] = useState(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const { id } = useParams();
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      setIsLoading(true);
      setIsLoadingRelated(true);
      setError(null);
      setDescExpanded(false);

      try {
        const data = await ApiService.fetching(
          `videos?part=snippet,statistics&id=${id}`
        );
        const detail = data?.items?.[0] ?? null;
        if (cancelled) return;

        setVideoDetail(detail);
        setIsLoading(false);

        // The API's relatedToVideoId parameter was removed in 2023, so we
        // show other uploads from the same channel instead.
        const channelId = detail?.snippet?.channelId;
        if (!channelId) {
          setRelatedVideo([]);
          setIsLoadingRelated(false);
          return;
        }

        const relatedData = await ApiService.fetching(
          `search?part=snippet&channelId=${channelId}&type=video&order=date`
        );
        if (cancelled) return;

        setRelatedVideo(
          (relatedData?.items ?? []).filter(
            (item) => item?.id?.videoId && item.id.videoId !== id
          )
        );
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? "Failed to load video");
          setVideoDetail(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsLoadingRelated(false);
        }
      }
    };

    getData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) return <Loader />;

  if (error || !videoDetail?.snippet) {
    return (
      <Stack minHeight="90vh" justifyContent="center" alignItems="center">
        <Typography variant="h6" sx={{ opacity: 0.6 }}>
          {error || "This video is unavailable."}
        </Typography>
      </Stack>
    );
  }

  const { snippet, statistics } = videoDetail;
  const description = snippet?.description ?? "";
  const isLongDescription = description.length > DESCRIPTION_CLAMP_THRESHOLD;

  return (
    <Box minHeight={"90vh"} mb={10}>
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />

          {snippet?.tags?.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap="8px" px={2} pt={2}>
              {snippet.tags.map((item, idx) => (
                <Chip
                  label={item}
                  key={`${item}-${idx}`}
                  sx={{ cursor: "pointer" }}
                  icon={<Tag />}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Stack>
          )}

          <Typography variant="h5" fontWeight="bold" p={2}>
            {snippet?.title}
          </Typography>
          <Box px={2}>
            <Typography
              variant="subtitle2"
              sx={{
                opacity: 0.7,
                whiteSpace: "pre-line",
                ...(!descExpanded && isLongDescription ? clamp(3) : {}),
              }}
            >
              {description}
            </Typography>
            {isLongDescription && (
              <Typography
                variant="body2"
                onClick={() => setDescExpanded((prev) => !prev)}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "primary.main",
                  mt: "6px",
                  display: "inline-block",
                }}
              >
                {descExpanded ? "Show less" : "Show more"}
              </Typography>
            )}
          </Box>

          <Stack direction="row" gap="20px" alignItems="center" py={1} px={2}>
            <Stack
              sx={{ opacity: 0.7 }}
              direction={"row"}
              alignItems={"center"}
              gap="3px"
            >
              <Visibility />
              {formatCount(statistics?.viewCount)} views
            </Stack>
            <Stack
              sx={{ opacity: 0.7 }}
              direction="row"
              alignItems="center"
              gap="3px"
            >
              <FavoriteOutlined />
              {formatCount(statistics?.likeCount)} likes
            </Stack>
            <Stack
              sx={{ opacity: 0.7 }}
              direction="row"
              alignItems="center"
              gap="3px"
            >
              <MarkChatRead />
              {formatCount(statistics?.commentCount)} comments
            </Stack>
          </Stack>

          <Stack direction="row" gap="20px" alignItems="center" py={1} px={2}>
            <Link to={`/channel/${snippet?.channelId}`}>
              <Stack
                direction="row"
                alignItems="center"
                gap="5px"
                marginTop="5px"
              >
                <Avatar
                  alt={snippet?.channelTitle}
                  src={snippet?.thumbnails?.default?.url}
                  sx={{
                    boxShadow: isDark ? `0 0 16px ${cosmicGlow.purple}` : "none",
                  }}
                />
                <Typography variant="subtitle2" color="text.secondary">
                  {snippet?.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "text.secondary", ml: "5px" }}
                  />
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Box>

        <Box
          width={{ xs: "100%", md: "25%" }}
          px={2}
          py={{ md: 1, xs: 5 }}
          overflow={"auto"}
          maxHeight={"120vh"}
        >
          <Stack gap={"14px"}>
            {isLoadingRelated ? (
              Array.from({ length: 6 }).map((_, i) => (
                <RelatedVideoCardSkeleton key={i} />
              ))
            ) : relatedVideo.length ? (
              relatedVideo.map((item) => (
                <RelatedVideoCard
                  key={item?.id?.videoId ?? item?.etag}
                  video={item}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                No related videos.
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;

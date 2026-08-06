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
import { Videos, Loader } from "../";

const formatCount = (value) =>
  value === undefined || value === null
    ? "—"
    : parseInt(value, 10).toLocaleString("en-US");

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      setIsLoading(true);
      setIsLoadingRelated(true);
      setError(null);

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

  return (
    <Box minHeight={"90vh"} mb={10}>
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />

          {snippet?.tags?.map((item, idx) => (
            <Chip
              label={item}
              key={`${item}-${idx}`}
              sx={{ marginTop: "10px", cursor: "pointer", ml: "10px" }}
              icon={<Tag />}
              variant="outlined"
            />
          ))}

          <Typography variant="h5" fontWeight="bold" p={2}>
            {snippet?.title}
          </Typography>
          <Typography variant="subtitle2" p={2} sx={{ opacity: ".7" }}>
            {snippet?.description}
          </Typography>

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
                />
                <Typography variant="subtitle2" color="gray">
                  {snippet?.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
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
          <Videos videos={relatedVideo} isLoading={isLoadingRelated} />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;

import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiService } from "../../service/api.service";
import { ChannelCard, Videos } from "../";

const Channel = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // statistics -> subscriber count, brandingSettings -> banner image.
        // Both are read by the UI, so they must be requested explicitly.
        const channelData = await ApiService.fetching(
          `channels?part=snippet,statistics,brandingSettings&id=${id}`
        );
        if (!cancelled) setChannelDetail(channelData?.items?.[0] ?? null);

        // order=date returns the channel's uploads newest-first and keeps
        // the channel itself out of the result list.
        const videoData = await ApiService.fetching(
          `search?channelId=${id}&part=snippet%2Cid&order=date`
        );
        if (!cancelled) setVideos(videoData?.items ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? "Failed to load channel");
          setVideos([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    getData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <Box minHeight={"95vh"} mt={"10vh"}>
      <Box>
        <Box
          width={"100%"}
          zIndex={10}
          sx={{
            height: "clamp(100px, 20vw, 280px)",
            backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            bgcolor: "action.hover",
          }}
        />
        {channelDetail && (
          <ChannelCard
            video={channelDetail}
            marginTop={{ xs: "-50px", sm: "-70px", md: "-100px" }}
          />
        )}
      </Box>
      <Container maxWidth={"90%"}>
        <Videos videos={videos} isLoading={isLoading} error={error} />
      </Container>
    </Box>
  );
};

export default Channel;

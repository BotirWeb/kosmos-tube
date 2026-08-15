import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useColorMode } from "../../theme/color-mode-context";
import { cosmicGlow } from "../../theme/cosmic";

const ChannelCard = ({ video, marginTop }) => {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop: marginTop,
      }}
    >
      <Link
        to={`/channel/${video?.id.channelId ? video?.id.channelId : video?.id}`}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <CardMedia
            image={video?.snippet?.thumbnails?.high?.url}
            alt={video?.snippet?.title}
            sx={{
              borderRadius: "50%",
              width: "180px",
              height: "180px",
              mb: 2,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: isDark ? `0 0 28px ${cosmicGlow.purple}` : "none",
            }}
          />
          <Typography variant={"h6"}>
            {video?.snippet?.title}
            {""}
            <CheckCircle
              sx={{ fontSize: "14px", color: "text.secondary", ml: "5px" }}
            />
          </Typography>
          {video?.statistics?.subscriberCount && (
            <Typography
              sx={{ fontSize: "15px", fontWeight: 500, color: "text.secondary" }}
            >
              {parseInt(video?.statistics?.subscriberCount).toLocaleString(
                "en-US"
              )}
              {""} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;

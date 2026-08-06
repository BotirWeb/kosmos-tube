import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import moment from "moment";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const VideoCard = ({ video, avatarUrl }) => {
  const { snippet } = video ?? {};

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        border: "1px solid",
        borderColor: "divider",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <Link to={`/video/${video?.id?.videoId}`}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title ?? "Video thumbnail"}
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "cover",
          }}
        />
      </Link>
      <CardContent
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Link to={`/video/${video?.id?.videoId}`}>
          <Typography my={"5px"} sx={{ opacity: 0.5 }} variant="caption">
            {snippet?.publishedAt && moment(snippet.publishedAt).fromNow()}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" sx={clamp(2)}>
            {snippet?.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.6, ...clamp(2) }}>
            {snippet?.description}
          </Typography>
        </Link>

        <Link to={`/channel/${snippet?.channelId}`}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={"5px"}
            mt={"auto"}
            pt={"10px"}
          >
            <Avatar
              alt={snippet?.channelTitle}
              src={avatarUrl}
              sx={{ width: 28, height: 28 }}
            >
              {snippet?.channelTitle?.charAt(0)}
            </Avatar>
            <Typography variant="subtitle2" color={"text.secondary"}>
              {snippet?.channelTitle}
              <CheckCircle
                sx={{ fontSize: "12px", color: "text.secondary", ml: "5px" }}
              />
            </Typography>
          </Stack>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

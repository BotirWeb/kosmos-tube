import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import moment from "moment";
import { colors } from "../../constants/colors";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const VideoCard = ({ video }) => {
  const { snippet } = video ?? {};

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "360px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={`/video/${video?.id?.videoId}`}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title ?? "Video thumbnail"}
          sx={{
            width: { xs: "100%", sm: "360px" },
            height: "180px",
            objectFit: "cover",
          }}
        />
      </Link>
      <CardContent
        sx={{
          background: colors.primary,
          height: "200px",
          position: "relative",
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
            position={"absolute"}
            bottom={"10px"}
            alignItems={"center"}
            gap={"5px"}
          >
            <Avatar alt={snippet?.channelTitle}>
              {snippet?.channelTitle?.charAt(0)}
            </Avatar>
            <Typography variant="subtitle2" color={"gray"}>
              {snippet?.channelTitle}
              <CheckCircle
                sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
              />
            </Typography>
          </Stack>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

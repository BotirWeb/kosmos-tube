import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../service/api.service";
import { Box, Container, Typography } from "@mui/material";
import { colors } from "../../constants/colors";
import { Videos } from "../";
import { useColorMode } from "../../theme/color-mode-context";
import { gradientTextSx } from "../../theme/cosmic";

const Search = () => {
  const { mode } = useColorMode();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const query = decodeURIComponent(id ?? "");

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await ApiService.fetching(
          `search?part=snippet&q=${encodeURIComponent(query)}`
        );
        if (!cancelled) setVideos(data?.items ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? "Failed to load search results");
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
  }, [query]);

  return (
    <Box p={2} sx={{ minHeight: "90vh" }}>
      <Container maxWidth={"90%"}>
        <Typography variant={"h4"} fontWeight={"bold"} mb={2}>
          Search results for{" "}
          <span
            style={mode === "dark" ? gradientTextSx : { color: colors.secondary }}
          >
            {query}
          </span>
        </Typography>
        <Videos videos={videos} isLoading={isLoading} error={error} />
      </Container>
    </Box>
  );
};

export default Search;

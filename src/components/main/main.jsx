import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { Category, Videos } from "../";
import { ApiService } from "../../service/api.service";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedCategoryHandler = (category) => setSelectedCategory(category);

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await ApiService.fetching(
          `search?part=snippet&q=${encodeURIComponent(selectedCategory)}`
        );
        if (!cancelled) setVideos(data?.items ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message ?? "Failed to load videos");
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
  }, [selectedCategory]);

  return (
    <Stack>
      <Category
        selectedCategoryHandler={selectedCategoryHandler}
        selectedCategory={selectedCategory}
      />
      <Box sx={{ minHeight: "90vh" }} p={2}>
        <Typography variant={"h4"} fontWeight={"bold"} mb={2}>
          {selectedCategory}{" "}
          <span style={{ color: colors.secondary }}>videos</span>
        </Typography>

        <Videos videos={videos} isLoading={isLoading} error={error} />
      </Box>
    </Stack>
  );
};

export default Main;

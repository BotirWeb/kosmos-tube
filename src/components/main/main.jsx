import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { Category, Videos } from "../";
import { ApiService } from "../../service/api.service";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  const selectedCategoryHandler = (category) => setSelectedCategory(category);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiService.fetching(
          `search?part=snippet&q=${selectedCategory}`
        );
        setVideos(data.items);
      } catch (error) {
        console.log(error);
      }
    };

    getData();

    // ApiService.fetching("search").then((data) => setVideos(data));
  }, [selectedCategory]);

  return (
    <Stack>
      <Category
        selectedCategoryHandler={selectedCategoryHandler}
        selectedCategory={selectedCategory}
      />
      <Box sx={{ height: "90vh" }} p={2}>
        <Typography variant={"h4"} fontWeight={"bold"} mb={2}>
          {selectedCategory}{" "}
          <span style={{ color: colors.secondary }}>videos</span>
        </Typography>

        <Videos
          videos={videos}
          selectedCategory={selectedCategory}
          setVideos={setVideos}
        />
      </Box>
    </Stack>
  );
};

export default Main;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../service/api.service";
import { Box, Container, Typography } from "@mui/material";
import { colors } from "../../constants/colors";
import { Videos } from "../";

const Search = () => {
  const [video, setVideo] = useState([]);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiService.fetching(`search?part=snippet&q=${id}`);
        setVideo(data.items);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [id]);

  return (
    <Box p={2} sx={{ height: "90vh" }}>
      <Container maxWidth={"90%"}>
        <Typography variant={"h4"} fontWeight={"bold"} mb={2}>
          Search results for{" "}
          <span style={{ color: colors.secondary }}>{id}</span> videos
        </Typography>
        <Videos videos={video} />
      </Container>
    </Box>
  );
};

export default Search;

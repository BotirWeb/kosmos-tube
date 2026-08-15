import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import {
  Main,
  Channel,
  VideoDetail,
  Search,
  Navbar,
  NotFound,
  Footer,
  CosmicBackground,
} from "../";
import { useColorMode } from "../../theme/color-mode-context";

const App = () => {
  const { mode } = useColorMode();

  return (
    <Box sx={{ position: "relative" }}>
      {mode === "dark" && <CosmicBackground />}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/channel/:id" element={<Channel />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/search/:id" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Box>
    </Box>
  );
};

export default App;

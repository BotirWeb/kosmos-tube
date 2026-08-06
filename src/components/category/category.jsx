import { Box, Stack } from "@mui/material";
import { category } from "../../constants";
import { colors } from "../../constants/colors";

const Category = ({ selectedCategory, selectedCategoryHandler }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Stack direction={"row"} sx={{ overflowX: "auto" }}>
        {category.map((item) => {
          const isActive = item.name === selectedCategory;

          return (
            <button
              key={item.name}
              className="category-btn"
              aria-pressed={isActive}
              style={{
                background: isActive ? colors.secondary : "transparent",
                color: isActive ? "#fff" : "inherit",
              }}
              onClick={() => selectedCategoryHandler(item.name)}
            >
              <span
                style={{
                  color: isActive ? "#fff" : colors.secondary,
                  marginRight: "15px",
                  display: "flex",
                }}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </Stack>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 40,
          pointerEvents: "none",
          background: (theme) =>
            `linear-gradient(to right, transparent, ${theme.palette.background.default})`,
        }}
      />
    </Box>
  );
};

export default Category;

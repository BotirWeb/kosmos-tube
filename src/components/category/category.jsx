import { Stack } from "@mui/material";
import { category } from "../../constants";
import { colors } from "../../constants/colors";

const Category = ({ selectedCategory, selectedCategoryHandler }) => {
  return (
    <Stack direction={"row"} sx={{ overflowX: "auto" }}>
      {category.map((item) => {
        const isActive = item.name === selectedCategory;

        return (
          <button
            key={item.name}
            className="category-btn"
            aria-pressed={isActive}
            style={{
              borderRadius: 0,
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
  );
};

export default Category;

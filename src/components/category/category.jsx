import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { category } from "../../constants";
import { colors } from "../../constants/colors";
import { useColorMode } from "../../theme/color-mode-context";
import { cosmicGlow } from "../../theme/cosmic";

const STORAGE_KEY = "kosmos-tube-sidebar-collapsed";
const SIDEBAR_WIDTH = 220;
const SIDEBAR_WIDTH_COLLAPSED = 72;

const Category = ({ selectedCategory, selectedCategoryHandler }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true"
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  if (isDesktop) {
    const width = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;

    return (
      <Stack
        component="nav"
        aria-label="Categories"
        sx={{
          width,
          flexShrink: 0,
          alignSelf: "flex-start",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: "width 0.2s ease",
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            px: 1,
            mb: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        {category.map((item) => {
          const isActive = item.name === selectedCategory;

          const button = (
            <button
              className="category-btn"
              aria-pressed={isActive}
              style={{
                width: "100%",
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "10px 0" : "7px 15px",
                background: isActive ? colors.secondary : "transparent",
                color: isActive ? "#fff" : "inherit",
                boxShadow:
                  isActive && isDark ? `0 0 20px ${cosmicGlow.purple}` : "none",
              }}
              onClick={() => selectedCategoryHandler(item.name)}
            >
              <span
                style={{
                  color: isActive ? "#fff" : colors.secondary,
                  marginRight: collapsed ? 0 : "15px",
                  display: "flex",
                }}
              >
                {item.icon}
              </span>
              {!collapsed && <span>{item.name}</span>}
            </button>
          );

          return collapsed ? (
            <Tooltip key={item.name} title={item.name} placement="right">
              {button}
            </Tooltip>
          ) : (
            <Box key={item.name}>{button}</Box>
          );
        })}
      </Stack>
    );
  }

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
                boxShadow:
                  isActive && isDark ? `0 0 20px ${cosmicGlow.purple}` : "none",
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

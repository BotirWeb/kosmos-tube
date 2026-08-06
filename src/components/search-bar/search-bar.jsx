import { Paper, IconButton } from "@mui/material";
import { colors } from "../../constants/colors";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const query = value.trim();
    if (!query) return;

    navigate(`/search/${encodeURIComponent(query)}`);
    setValue("");
  };

  return (
    <Paper
      component={"form"}
      onSubmit={submitHandler}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        border: `1px solid ${colors.secondary}`,
        pl: 2,
        boxShadow: "none",
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="search_bar"
        aria-label="Search videos"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="submit" aria-label="Submit search">
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

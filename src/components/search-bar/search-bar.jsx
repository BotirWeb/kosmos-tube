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
    navigate(`/search/${value}`);
    setValue("");
  };
  console.log(value);

  return (
    <Paper
      component={"form"}
      onSubmit={submitHandler}
      sx={{
        border: `1px solid ${colors.secondary}`,
        pl: 2,
        boxShadow: "none",
        mr: "5px",
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="search_bar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

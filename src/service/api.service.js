import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const RAPID_API_KEY = process.env.REACT_APP_PUBLIC_KEY;

if (!RAPID_API_KEY) {
  console.error(
    "[kosmos-tube] REACT_APP_PUBLIC_KEY is not set. " +
      "Create a .env file in the project root with your RapidAPI key. See README.md."
  );
}

const options = {
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const ApiService = {
  async fetching(url) {
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    return response.data;
  },
};

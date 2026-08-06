# Kosmos Tube

A YouTube-style video streaming interface built with React. Search for videos,
browse by category, watch with related-video suggestions, and view channel pages.

**Live demo:** https://kosmos-tube.vercel.app

<!-- Bu yerga saytning screenshot'ini qo'ying:
![Kosmos Tube](./public/screenshot.png)
-->

---

## What it does

- **Search** — query any term and get live results from the video API
- **Category sidebar** — filter by Music, Education, Gaming, Coding and more
- **Video player page** — embedded player with title, channel, view count and description
- **Related videos** — suggestions loaded alongside the current video
- **Channel pages** — channel banner, avatar, subscriber count and uploaded videos
- **Responsive** — adapts from mobile to desktop

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| UI components | Material UI (MUI) |
| HTTP | Axios |
| Video playback | react-player |
| Date formatting | Moment.js |
| API | RapidAPI — YouTube v3 |

---

## Running locally

```bash
git clone https://github.com/BotirWeb/kosmos-tube.git
cd kosmos-tube
npm install
```

Create a `.env` file in the project root:

```
REACT_APP_PUBLIC_KEY=your_rapidapi_key_here
```

Then start the dev server:

```bash
npm start
```

The app runs at `http://localhost:3000`.

---

## Project structure

```
src/
├── components/     # Navbar, Sidebar, VideoCard, ChannelCard, SearchBar…
├── utils/          # API fetching logic, category constants
├── App.js
└── index.js
```

---

## What I learned building this

- Fetching and normalising data from a third-party REST API with Axios
- Handling loading and empty states so the UI never breaks on slow responses
- Composing a layout from Material UI primitives instead of writing CSS from scratch
- Dynamic routing with React Router for video and channel detail pages

---

## Notes

This project was built to practise working with external APIs and component-driven
React architecture. The design follows YouTube's layout as a reference.

---

## License

MIT

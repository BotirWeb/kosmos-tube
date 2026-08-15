export const cosmicAccent = {
  purple: "#a855f7",
  pink: "#ec4899",
  cyan: "#22d3ee",
};

export const cosmicGlow = {
  purple: "rgba(168, 85, 247, 0.45)",
  pink: "rgba(236, 72, 153, 0.45)",
  cyan: "rgba(34, 211, 238, 0.45)",
};

// Glassmorphism surface: translucent + blurred in dark (cosmic) mode,
// a plain bordered surface in light mode where blur/translucency has
// nothing dark to show through and would just look muddy.
export const glassSx = (mode) =>
  mode === "dark"
    ? {
        backgroundColor: "rgba(255,255,255,0.045)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.09)",
      }
    : {
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      };

export const gradientTextSx = {
  backgroundImage: `linear-gradient(90deg, ${cosmicAccent.purple}, ${cosmicAccent.cyan})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

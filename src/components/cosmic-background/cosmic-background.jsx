import { useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const twinkle = keyframes`
  0%, 100% { opacity: 0.15; }
  50% { opacity: 1; }
`;

const drift = keyframes`
  0% { transform: translate(0, 0); }
  100% { transform: translate(-40px, -30px); }
`;

const float = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -20px) scale(1.08); }
  100% { transform: translate(-20px, 15px) scale(0.96); }
`;

const STAR_COUNT = 140;

const buildStars = () =>
  Array.from({ length: STAR_COUNT }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.3 + 0.3,
    baseOpacity: Math.random() * 0.5 + 0.25,
    duration: Math.random() * 4 + 2.5,
    delay: Math.random() * 5,
  }));

const NEBULAE = [
  { top: "-12%", left: "-8%", size: 560, color: "168,85,247", duration: 55 },
  { top: "4%", right: "-10%", size: 480, color: "34,211,238", duration: 65 },
  { bottom: "-15%", left: "26%", size: 520, color: "236,72,153", duration: 48 },
];

const CosmicBackground = () => {
  const stars = useMemo(buildStars, []);
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const nebulaLayerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (nebulaLayerRef.current) {
          nebulaLayerRef.current.style.transform = `translateY(${
            window.scrollY * 0.06
          }px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        bgcolor: "background.default",
      }}
    >
      <Box ref={nebulaLayerRef} sx={{ position: "absolute", inset: 0 }}>
        {NEBULAE.map((n, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: n.top,
              left: n.left,
              right: n.right,
              bottom: n.bottom,
              width: n.size,
              height: n.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${n.color}, 0.55), transparent 70%)`,
              filter: "blur(70px)",
              opacity: 0.55,
              animation: prefersReducedMotion
                ? "none"
                : `${float} ${n.duration}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </Box>

      <Box
        component="svg"
        width="100%"
        height="100%"
        sx={{
          position: "absolute",
          inset: 0,
          animation: prefersReducedMotion
            ? "none"
            : `${drift} 140s linear infinite alternate`,
        }}
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="#fff"
            style={{
              opacity: s.baseOpacity,
              animation: prefersReducedMotion
                ? "none"
                : `${twinkle} ${s.duration}s ease-in-out infinite`,
              animationDelay: prefersReducedMotion ? undefined : `${s.delay}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CosmicBackground;

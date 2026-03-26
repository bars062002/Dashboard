import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo büyüme animasyonu
  const logoScale = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 40,
  });

  // Başlık kayma animasyonu
  const titleY = spring({
    fps,
    frame: frame - 20,
    config: { damping: 12, stiffness: 60 },
    durationInFrames: 40,
  });

  const titleTranslate = interpolate(titleY, [0, 1], [60, 0]);
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Alt yazı animasyonu
  const subtitleOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [50, 75], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Parçacık animasyonları
  const particles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2;
    const radius = interpolate(frame, [0, 60], [0, 200], {
      extrapolateRight: "clamp",
    });
    const opacity = interpolate(frame, [0, 20, 50, 80], [0, 0.7, 0.5, 0], {
      extrapolateRight: "clamp",
    });
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, opacity };
  });

  // Arka plan gradient animasyonu
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: bgOpacity,
      }}
    >
      {/* Arka plan ızgara deseni */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Parlayan çemberler */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: `hsl(${200 + i * 30}, 90%, 65%)`,
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: p.opacity,
            boxShadow: `0 0 20px hsl(${200 + i * 30}, 90%, 65%)`,
          }}
        />
      ))}

      {/* Logo / İkon */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginBottom: 40,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px rgba(99,102,241,0.8), 0 0 120px rgba(99,102,241,0.4)",
          }}
        >
          {/* Dashboard grid ikonu */}
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="2" fill="white" opacity="0.9" />
            <rect x="14" y="3" width="7" height="7" rx="2" fill="white" opacity="0.7" />
            <rect x="3" y="14" width="7" height="7" rx="2" fill="white" opacity="0.7" />
            <rect x="14" y="14" width="7" height="7" rx="2" fill="white" opacity="0.9" />
          </svg>
        </div>
      </div>

      {/* Ana başlık */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslate}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            margin: 0,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            letterSpacing: -2,
            textShadow: "0 0 40px rgba(99,102,241,0.5)",
          }}
        >
          Dashboard
        </h1>
        <div
          style={{
            height: 4,
            width: 200,
            background: "linear-gradient(90deg, #6366f1, #06b6d4)",
            borderRadius: 2,
            margin: "16px auto",
          }}
        />
      </div>

      {/* Alt yazı */}
      <p
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 26,
          color: "rgba(200,210,255,0.85)",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          letterSpacing: 4,
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Verinin Gücünü Keşfet
      </p>
    </AbsoluteFill>
  );
};

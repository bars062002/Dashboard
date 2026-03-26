import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 16l4-5 3 3 5-6" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Gerçek Zamanlı Analitik",
    desc: "Anlık veri akışı ile tüm metrikleri canlı takip edin",
    color: "#06b6d4",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="white" strokeWidth="2.5" />
        <path d="M8 9h8M8 13h5" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Akıllı Raporlama",
    desc: "Otomatik raporlar ile iş kararlarınızı hızlandırın",
    color: "#8b5cf6",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2.5" />
        <path d="M12 7v5l3 3" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Zaman Tasarrufu",
    desc: "Otomatik görevler ile saatlerce iş dakikalara iner",
    color: "#f59e0b",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Çok Katmanlı Görünüm",
    desc: "Farklı departmanlar için özelleştirilebilir paneller",
    color: "#10b981",
  },
];

const FeatureCard: React.FC<{
  feature: typeof features[0];
  index: number;
  frame: number;
  fps: number;
}> = ({ feature, index, frame, fps }) => {
  const delay = index * 15;

  const cardSpring = spring({
    fps,
    frame: frame - delay,
    config: { damping: 14, stiffness: 70 },
    durationInFrames: 35,
  });

  const translateX = interpolate(cardSpring, [0, 1], [-80, 0]);
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${feature.color}40`,
        borderRadius: 20,
        padding: "24px 28px",
        opacity,
        transform: `translateX(${translateX}px)`,
        backdropFilter: "blur(10px)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `${feature.color}20`,
          border: `1px solid ${feature.color}60`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: `0 0 20px ${feature.color}30`,
        }}
      >
        {feature.icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "white",
            fontFamily: "'Segoe UI', Arial, sans-serif",
            marginBottom: 6,
          }}
        >
          {feature.title}
        </div>
        <div
          style={{
            fontSize: 15,
            color: "rgba(180,190,220,0.8)",
            fontFamily: "'Segoe UI', Arial, sans-serif",
            lineHeight: 1.5,
          }}
        >
          {feature.desc}
        </div>
      </div>
    </div>
  );
};

export const Scene2Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 25], [-30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)",
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Arka plan efekti */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Başlık */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: 30,
            padding: "8px 24px",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#6366f1",
              boxShadow: "0 0 10px #6366f1",
            }}
          />
          <span
            style={{
              color: "#a5b4fc",
              fontSize: 14,
              fontFamily: "'Segoe UI', Arial, sans-serif",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Öne Çıkan Özellikler
          </span>
        </div>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            margin: 0,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            letterSpacing: -1,
          }}
        >
          Her Şey Tek Ekranda
        </h2>
      </div>

      {/* Özellik kartları */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <FeatureCard feature={features[0]} index={0} frame={frame} fps={fps} />
          <FeatureCard feature={features[1]} index={1} frame={frame} fps={fps} />
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <FeatureCard feature={features[2]} index={2} frame={frame} fps={fps} />
          <FeatureCard feature={features[3]} index={3} frame={frame} fps={fps} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

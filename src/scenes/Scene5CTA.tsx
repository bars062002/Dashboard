import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const Checkmark: React.FC<{ frame: number; delay: number; text: string }> = ({
  frame,
  delay,
  text,
}) => {
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame - delay, [0, 20], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity,
        transform: `translateX(${x}px)`,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(16,185,129,0.2)",
          border: "2px solid #10b981",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7l3.5 3.5L12 3"
            stroke="#10b981"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontSize: 18,
          color: "rgba(220,230,255,0.85)",
          fontFamily: "'Segoe UI', Arial, sans-serif",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Büyük daire animasyonu
  const ringScale = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 50 },
    durationInFrames: 50,
  });

  // Başlık animasyonu
  const titleSpring = spring({
    fps,
    frame: frame - 10,
    config: { damping: 14, stiffness: 70 },
    durationInFrames: 40,
  });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // CTA butonu
  const btnOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const btnScale = spring({
    fps,
    frame: frame - 70,
    config: { damping: 12, stiffness: 80 },
    durationInFrames: 30,
  });

  // Parlama pulse efekti
  const glowPulse = 0.6 + 0.4 * Math.sin((frame / 12) * Math.PI);

  // Alt fade (kapanış)
  const fadeOut = interpolate(frame, [100, 115], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const checks = [
    "Kurulum gerektirmez — tarayıcıdan erişin",
    "Sınırsız veri entegrasyonu",
    "Ekip işbirliği ve canlı paylaşım",
    "7/24 güvenli bulut altyapısı",
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      {/* Arka plan ızgara */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Büyük parlayan halkalar */}
      {[1, 0.7, 0.4].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: `1px solid rgba(99,102,241,${0.15 * s})`,
            transform: `scale(${ringScale * (0.5 + i * 0.35)})`,
            boxShadow: `0 0 ${40 * s * glowPulse}px rgba(99,102,241,${0.1 * s})`,
          }}
        />
      ))}

      {/* İçerik */}
      <div
        style={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 860,
          width: "100%",
          padding: "0 60px",
        }}
      >
        {/* Rozet */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: 30,
            padding: "8px 24px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
              fill="#6366f1"
            />
          </svg>
          <span
            style={{
              color: "#a5b4fc",
              fontSize: 14,
              fontFamily: "'Segoe UI', Arial, sans-serif",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Hazır mısınız?
          </span>
        </div>

        {/* Ana başlık */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <h1
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: "white",
              margin: 0,
              fontFamily: "'Segoe UI', Arial, sans-serif",
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            Dashboard ile
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Farkı Yaşayın
            </span>
          </h1>
        </div>

        {/* İki kolon */}
        <div style={{ display: "flex", gap: 60, width: "100%", marginBottom: 44 }}>
          {/* Checklistler */}
          <div style={{ flex: 1 }}>
            {checks.map((c, i) => (
              <Checkmark key={i} frame={frame} delay={35 + i * 10} text={c} />
            ))}
          </div>

          {/* Stat kutuları */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              { value: "10.000+", label: "Aktif Ekip", color: "#6366f1" },
              { value: "%99.9", label: "Çalışma Süresi", color: "#10b981" },
              { value: "50ms", label: "Ortalama Yanıt", color: "#06b6d4" },
            ].map((stat, i) => {
              const sOpacity = interpolate(frame - (40 + i * 10), [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    opacity: sOpacity,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 36,
                      borderRadius: 3,
                      background: stat.color,
                      boxShadow: `0 0 12px ${stat.color}`,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: stat.color,
                        fontFamily: "'Segoe UI', Arial, sans-serif",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(180,190,220,0.6)",
                        fontFamily: "'Segoe UI', Arial, sans-serif",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Butonu */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
              borderRadius: 18,
              padding: "20px 56px",
              fontSize: 22,
              fontWeight: 700,
              color: "white",
              fontFamily: "'Segoe UI', Arial, sans-serif",
              letterSpacing: 0.5,
              boxShadow: `0 0 ${40 * glowPulse}px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.3)`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Hemen Başla — Ücretsiz
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

// Sahte canlı veri noktaları (line chart için)
const lineData = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35, 30, 38, 42, 36, 44, 40, 48, 45, 52, 49];

const LineChart: React.FC<{ frame: number }> = ({ frame }) => {
  const width = 680;
  const height = 160;
  const progress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const points = lineData.map((v, i) => {
    const x = (i / (lineData.length - 1)) * width;
    const y = height - ((v - 10) / 45) * height;
    return { x, y };
  });

  // Aktif noktaların sayısı
  const visibleCount = Math.floor(progress * lineData.length);

  const pathPoints = points.slice(0, Math.max(2, visibleCount + 1));
  const linePath = pathPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Dolgu alanı
  const fillPath = `${linePath} L ${pathPoints[pathPoints.length - 1].x} ${height} L 0 ${height} Z`;

  // Son aktif nokta
  const lastPoint = pathPoints[pathPoints.length - 1];

  const pulseScale = 1 + 0.3 * Math.sin((frame / 6) * Math.PI);

  return (
    <svg width={width} height={height + 20} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Yatay ızgara çizgileri */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={0}
          y1={height * t}
          x2={width}
          y2={height * t}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      ))}

      {/* Dolgu alanı */}
      <path d={fillPath} fill="url(#fillGrad)" />

      {/* Ana çizgi */}
      <path
        d={linePath}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Aktif nokta (titreşen) */}
      {visibleCount > 0 && (
        <>
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={8 * pulseScale}
            fill="rgba(99,102,241,0.2)"
          />
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={5}
            fill="#6366f1"
            stroke="white"
            strokeWidth={2}
          />
        </>
      )}
    </svg>
  );
};

const ActivityItem: React.FC<{
  user: string;
  action: string;
  time: string;
  color: string;
  frame: number;
  delay: number;
}> = ({ user, action, time, color, frame, delay }) => {
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame - delay, [0, 15], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Canlı göstergesi titremesi
  const pulse = Math.sin((frame / 8) * Math.PI) * 0.3 + 0.7;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `${color}30`,
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
          color,
          fontFamily: "'Segoe UI', Arial, sans-serif",
          flexShrink: 0,
        }}
      >
        {user[0]}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            color: "white",
            fontFamily: "'Segoe UI', Arial, sans-serif",
            fontWeight: 600,
          }}
        >
          {user}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(180,190,220,0.6)",
            fontFamily: "'Segoe UI', Arial, sans-serif",
          }}
        >
          {action}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#10b981",
            opacity: pulse,
            boxShadow: "0 0 6px #10b981",
          }}
        />
        <div
          style={{
            fontSize: 11,
            color: "rgba(180,190,220,0.5)",
            fontFamily: "'Segoe UI', Arial, sans-serif",
          }}
        >
          {time}
        </div>
      </div>
    </div>
  );
};

const activities = [
  { user: "Ahmet Y.", action: "Yeni rapor oluşturdu", time: "şimdi", color: "#6366f1" },
  { user: "Selin K.", action: "Gösterge panelini güncelledi", time: "2dk", color: "#8b5cf6" },
  { user: "Mert D.", action: "Veri dışa aktardı", time: "5dk", color: "#06b6d4" },
  { user: "Zeynep A.", action: "Uyarı kurulumu yaptı", time: "8dk", color: "#10b981" },
  { user: "Can B.", action: "Ekip paylaşımı oluşturdu", time: "12dk", color: "#f59e0b" },
];

export const Scene4LiveData: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 70 },
    durationInFrames: 30,
  });

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Anlık sayaç
  const counterValue = Math.floor(
    interpolate(frame, [10, 70], [3200, 3841], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 60%, #0f0c29 100%)",
        padding: "50px 80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sağ arka plan efekti */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Başlık */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "white",
            margin: 0,
            fontFamily: "'Segoe UI', Arial, sans-serif",
          }}
        >
          Canlı İzleme
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 20,
            padding: "8px 18px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px #10b981",
              animation: "pulse 1s infinite",
            }}
          />
          <span
            style={{
              color: "#10b981",
              fontSize: 14,
              fontFamily: "'Segoe UI', Arial, sans-serif",
              fontWeight: 600,
            }}
          >
            CANLI
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        {/* Sol: grafik + sayaç */}
        <div style={{ flex: 1.4, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Aktif kullanıcı sayacı */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: 16,
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "rgba(180,190,220,0.6)",
                fontFamily: "'Segoe UI', Arial, sans-serif",
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Aktif Kullanıcı
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span
                style={{
                  fontSize: 52,
                  fontWeight: 800,
                  color: "#6366f1",
                  fontFamily: "'Segoe UI', Arial, sans-serif",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {counterValue.toLocaleString("tr-TR")}
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: "#10b981",
                  fontFamily: "'Segoe UI', Arial, sans-serif",
                  fontWeight: 600,
                }}
              >
                ▲ %8.3
              </span>
            </div>
          </div>

          {/* Çizgi grafiği */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "20px 24px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "rgba(180,190,220,0.6)",
                fontFamily: "'Segoe UI', Arial, sans-serif",
                marginBottom: 16,
              }}
            >
              Son 20 Dakika — Oturum Akışı
            </div>
            <LineChart frame={frame} />
          </div>
        </div>

        {/* Sağ: aktivite akışı */}
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              fontFamily: "'Segoe UI', Arial, sans-serif",
              marginBottom: 16,
            }}
          >
            Son Aktiviteler
          </div>
          <div style={{ flex: 1 }}>
            {activities.map((a, i) => (
              <ActivityItem
                key={i}
                {...a}
                frame={frame}
                delay={20 + i * 10}
              />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

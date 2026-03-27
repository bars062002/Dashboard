import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const chartData = [
  { label: "Oca", value: 65, color: "#6366f1" },
  { label: "Şub", value: 78, color: "#8b5cf6" },
  { label: "Mar", value: 55, color: "#06b6d4" },
  { label: "Nis", value: 90, color: "#10b981" },
  { label: "May", value: 72, color: "#f59e0b" },
  { label: "Haz", value: 95, color: "#6366f1" },
  { label: "Tem", value: 85, color: "#8b5cf6" },
];

const BarChart: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const chartWidth = 700;
  const chartHeight = 280;
  const barWidth = 70;
  const gap = 30;
  const maxValue = 100;

  return (
    <div
      style={{
        position: "relative",
        width: chartWidth,
        height: chartHeight + 60,
      }}
    >
      {/* Y ekseni çizgileri */}
      {[0, 25, 50, 75, 100].map((tick) => {
        const y = chartHeight - (tick / maxValue) * chartHeight;
        return (
          <div
            key={tick}
            style={{
              position: "absolute",
              left: 0,
              top: y,
              width: chartWidth,
              height: 1,
              background: "rgba(255,255,255,0.08)",
            }}
          />
        );
      })}

      {/* Barlar */}
      <div style={{ display: "flex", alignItems: "flex-end", height: chartHeight, gap }}>
        {chartData.map((item, i) => {
          const delay = i * 8;
          const barProgress = spring({
            fps,
            frame: frame - delay,
            config: { damping: 16, stiffness: 60 },
            durationInFrames: 35,
          });

          const barHeight = (item.value / maxValue) * chartHeight * barProgress;
          const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const valueOpacity = interpolate(frame - delay, [20, 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                opacity,
              }}
            >
              {/* Değer etiketi */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: item.color,
                  fontFamily: "'Segoe UI', Arial, sans-serif",
                  marginBottom: 6,
                  opacity: valueOpacity,
                }}
              >
                {Math.round(item.value * barProgress)}%
              </div>

              {/* Bar */}
              <div
                style={{
                  width: barWidth,
                  height: barHeight,
                  background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}60 100%)`,
                  borderRadius: "8px 8px 0 0",
                  boxShadow: `0 0 20px ${item.color}50`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Parlama efekti */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    width: "30%",
                    height: "100%",
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "0 0 4px 4px",
                  }}
                />
              </div>

              {/* Etiket */}
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(180,190,220,0.7)",
                  fontFamily: "'Segoe UI', Arial, sans-serif",
                  marginTop: 10,
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  change: string;
  positive: boolean;
  frame: number;
  delay: number;
}> = ({ label, value, change, positive, frame, delay }) => {
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame - delay, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: "20px 24px",
        opacity,
        transform: `translateY(${translateY}px)`,
        flex: 1,
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
        {label}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "white",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 14,
          color: positive ? "#10b981" : "#ef4444",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          fontWeight: 600,
        }}
      >
        {positive ? "▲" : "▼"} {change}
      </div>
    </div>
  );
};

export const Scene3Analytics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 60%, #0d1b2a 100%)",
        padding: "50px 80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Arka plan parlama */}
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Başlık */}
      <div
        style={{
          opacity: headerOpacity,
          marginBottom: 36,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "white",
              margin: 0,
              fontFamily: "'Segoe UI', Arial, sans-serif",
            }}
          >
            Performans Analizi
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(180,190,220,0.6)",
              margin: "8px 0 0 0",
              fontFamily: "'Segoe UI', Arial, sans-serif",
            }}
          >
            Ocak — Temmuz 2026
          </p>
        </div>
        <div
          style={{
            background: "rgba(16,185,129,0.15)",
            border: "1px solid rgba(16,185,129,0.4)",
            borderRadius: 12,
            padding: "10px 20px",
            color: "#10b981",
            fontSize: 15,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            fontWeight: 600,
          }}
        >
          ▲ %23.5 Büyüme
        </div>
      </div>

      {/* Metrik kartları */}
      <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
        <MetricCard label="Toplam Kullanıcı" value="48.2K" change="%12.4 bu ay" positive frame={frame} delay={10} />
        <MetricCard label="Aktif Oturum" value="3.841" change="%8.1 bu hafta" positive frame={frame} delay={20} />
        <MetricCard label="Dönüşüm Oranı" value="%6.7" change="%2.3 düşüş" positive={false} frame={frame} delay={30} />
        <MetricCard label="Gelir" value="₺284K" change="%19.8 bu ay" positive frame={frame} delay={40} />
      </div>

      {/* Bar grafiği */}
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "24px 32px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <BarChart frame={frame} fps={fps} />
      </div>
    </AbsoluteFill>
  );
};

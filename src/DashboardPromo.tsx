import React from "react";
import {
  AbsoluteFill,
  Series,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Features } from "./scenes/Scene2Features";
import { Scene3Analytics } from "./scenes/Scene3Analytics";
import { Scene4LiveData } from "./scenes/Scene4LiveData";
import { Scene5CTA } from "./scenes/Scene5CTA";

// Her sahne için frame sayısı (30fps)
// Toplam: 90+105+105+105+120 = 525 frame = 17.5 saniye
const SCENE_DURATIONS = {
  s1: 90,   // 3s  — Açılış
  s2: 105,  // 3.5s — Özellikler
  s3: 105,  // 3.5s — Analitik
  s4: 105,  // 3.5s — Canlı veri
  s5: 120,  // 4s  — CTA kapanış
};

// Sahne geçişi için siyah fade overlay
const SceneFade: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  const frame = useCurrentFrame();

  // İlk 8 frame: fade in
  const fadeIn = interpolate(frame, [0, 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Son 8 frame: fade out
  const fadeOut = interpolate(frame, [totalFrames - 8, totalFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const overlayOpacity = Math.max(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        background: "black",
        opacity: overlayOpacity,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};

export const DashboardPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "black" }}>
      <Series>
        {/* Sahne 1: Açılış */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s1}>
          <AbsoluteFill>
            <Scene1Opening />
            <SceneFade totalFrames={SCENE_DURATIONS.s1} />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sahne 2: Özellikler */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s2}>
          <AbsoluteFill>
            <Scene2Features />
            <SceneFade totalFrames={SCENE_DURATIONS.s2} />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sahne 3: Analitik */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s3}>
          <AbsoluteFill>
            <Scene3Analytics />
            <SceneFade totalFrames={SCENE_DURATIONS.s3} />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sahne 4: Canlı Veri */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s4}>
          <AbsoluteFill>
            <Scene4LiveData />
            <SceneFade totalFrames={SCENE_DURATIONS.s4} />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Sahne 5: CTA Kapanış */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s5}>
          <AbsoluteFill>
            <Scene5CTA />
            <SceneFade totalFrames={SCENE_DURATIONS.s5} />
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

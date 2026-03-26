import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/**
 * İki sahne arasında yumuşak geçiş efekti uygular.
 * durationInFrames kadar sürer; ortasında tam siyah olur.
 */
export const FadeTransition: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const half = durationInFrames / 2;

  const opacity = interpolate(
    frame,
    [0, half, durationInFrames],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {children}
      <AbsoluteFill
        style={{
          background: "black",
          opacity: 1 - opacity,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

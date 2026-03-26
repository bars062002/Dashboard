import React from "react";
import { Composition } from "remotion";
import { DashboardPromo } from "./DashboardPromo";

// Toplam frame: 90+105+105+105+120 = 525
const TOTAL_FRAMES = 525;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DashboardPromo"
        component={DashboardPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

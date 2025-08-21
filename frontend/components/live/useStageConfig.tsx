import { useMemo } from "react";

export interface StageConfig {
  title: string;
  hallKey: "hall1" | "hall2";
  embedUrl: string;
}

export const useStageConfig = (stageName: string): StageConfig => {
  return useMemo(() => {
    const configs: Record<string, StageConfig> = {
      "main-stage": {
        title: "Main Stage",
        hallKey: "hall1" as const,
        embedUrl: "https://www.youtube.com/embed/EbcGAXOTWbA",
      },
      "hall-2": {
        title: "Hall 2",
        hallKey: "hall2" as const,
        embedUrl: "https://www.youtube.com/embed/EbcGAXOTWbA",
      },
      emerald: {
        title: "Emerald Hall",
        hallKey: "hall2" as const,
        embedUrl:
          "https://www.youtube.com/embed/tpHRVlHVpNg?list=PL3zxEUgm0RBP8lOIDI_pZv1jXOUTnDn4t",
      },
    };
    return configs[stageName] || configs["main-stage"];
  }, [stageName]);
};

export default useStageConfig;

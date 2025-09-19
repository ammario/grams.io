import { useEffect, useState } from "preact/hooks";
import type { ResponsiveLine as ResponsiveLineType } from "@nivo/line";

// Lazy import for the chart
export function useChart(): typeof ResponsiveLineType | undefined {
  const [[ResponsiveLine], setResponsiveLine] = useState<
    [typeof ResponsiveLineType] | [undefined]
  >([undefined]);

  useEffect(() => {
    import("@nivo/line").then((result) =>
      setResponsiveLine([result.ResponsiveLine])
    );
  }, [globalThis]);

  return ResponsiveLine;
}

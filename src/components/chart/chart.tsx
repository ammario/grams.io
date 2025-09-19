import { h } from "preact";
import { useMemo } from "preact/hooks";
import { useChart } from "./use-chart.ts";

export type ChartData = Record<string, Array<ChartPoint>>;

export type ChartPoint = {
  x: number;
  y: number;
};

export type ChartProps = {
  data: ChartData;
  height?: string;
};

export function Chart({ data, height = "40vh" }: ChartProps) {
  const ResponsiveLine = useChart()

  if (!ResponsiveLine) {
    return <div style={{ height: height }}></div>;
  }

  const chartData: Array<{ id: string; data: Array<ChartPoint> }> =
    useMemo(() => {
      const chartData = [];

      for (const [id, points] of Object.entries(data)) {
        chartData.push({
          id,
          data: points,
        });
      }

      return chartData;
    }, [data]);

  const maxDose = useMemo(() => {
    if (!chartData.length) {
      return 10;
    }
    const largestDose = Math.max(
      ...chartData.flatMap((entry) => entry.data).map((entry) => entry.y)
    );
    return "auto";
  }, [chartData]);

  const maxDuration = useMemo(() => {
    if (!chartData.length) {
      return 10;
    }
    const longestDuration = Math.max(
      ...chartData.flatMap((entry) => entry.data).map((entry) => entry.x)
    );
    if (longestDuration > 10) {
      return "auto";
    }
    return 10;
  }, [chartData]);

  return (
    <div style={{ height: height }}>
      <ResponsiveLine
        data={chartData}
        yScale={{
          type: "linear",
          min: 0,
          max: maxDose,
          stacked: false,
          reverse: false,
        }}
        xScale={{
          type: "linear",
          min: 0,
          max: maxDuration,
          stacked: false,
          reverse: false,
        }}
        animate={false}
        pointSize={0}
        lineWidth={3}
        theme={{
          background: "transparent",
          text: {
            fill: "var(--color-dark-text)",
          },
          grid: {
            line: {
              stroke: "var(--color-dark-text)",
            },
          },
          tooltip: {
            container: {
              background: "var(--color-grey-800)",
              color: "white",
            },
          },
        }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "seriesColor" }}
        useMesh={true}
        crosshairType="x"
      />
    </div>
  );
}

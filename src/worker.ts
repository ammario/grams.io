import type { ChartData } from "./components/chart/chart.tsx";
import type { Ingestion } from "./platform/ingestion.ts";
import { unit } from "mathjs";

globalThis.addEventListener(
  "message",
  ({ data }: Event & { data: [number, Array<Ingestion>] }) => {
    const [id, ingestions] = data;
    const result = intoChartData(ingestions);
    globalThis.postMessage([id, result]);
  }
);

export function tryParseUnit(v: string, u: string): number {
  try {
    return unit(v).toNumber(u);
  } catch {
    return parseFloat(v);
  }
}

function offsetInHours(ingestion: Ingestion): number {
  if (!ingestion.offset) throw new Error("No Offset");
  return tryParseUnit(ingestion.offset, "hours");
}

function doseInMg(ingestion: Ingestion): number {
  if (!ingestion.dosage) throw new Error("No Dosage");
  return tryParseUnit(ingestion.dosage, "mg");
}

function halfLifeInHours(ingestion: Ingestion): number {
  if (!ingestion.halfLife) throw new Error("No Halflife");
  return tryParseUnit(ingestion.halfLife, "hours");
}

export function calculateDecayRateHours(dose: number, halfLife: number): Array<number> {
  if (dose === 0) {
    return [0];
  }

  const decayConstant = Math.log(2) / halfLife;
  
  const decayArray: number[] = [];
  let hour = 0;
  let currentDose = dose;
  
  const threshold = dose * 0.0001; // 0.01% threshold
  
  while (currentDose >= threshold) {
    currentDose = dose * Math.exp(-decayConstant * hour);
    
    if (currentDose < threshold) {
      currentDose = 0;
    }
    
    decayArray.push(currentDose);
    hour++;
    
    if (hour > 1000) {
      break;
    }
  }
  
  return decayArray;
}

function intoChartData(ingestions: Ingestion[]): ChartData {
  try {
    const chartData: ChartData = {};

    for (const ingestion of ingestions) {
      if (!ingestion.dosage) return {};
      if (!ingestion.drugName) return {};
      if (!ingestion.offset) return {};
      if (!ingestion.halfLife) return {};

      if (!chartData[ingestion.drugName]) chartData[ingestion.drugName] = [];
      const entry = chartData[ingestion.drugName];

      for (const [hour, dose] of calculateDecayRateHours(
        doseInMg(ingestion),
        halfLifeInHours(ingestion)
      ).entries()) {
        const offsetHour = offsetInHours(ingestion) + hour;

        if (entry[offsetHour]) {
          entry[offsetHour].y += dose;
          continue;
        }
        entry.push({
          x: offsetInHours(ingestion) + hour,
          y: dose,
        });
      }
    }

    return chartData;
  } catch (error) {
    console.error(error);
    return {};
  }
}

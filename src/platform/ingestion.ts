import { ChartData } from "../components/chart/chart.tsx";
import { calculateDecayRateHours } from "./decay.ts";
import { tryParseUnit } from "./times.ts";

export class Ingestion {
  offset?: string;
  drugName?: string;
  dosage?: string;
  halfLife?: string;

  static empty(): Ingestion {
    const ingestion = new Ingestion()
    ingestion.offset = undefined
    ingestion.drugName = undefined
    ingestion.dosage = undefined
    ingestion.halfLife = undefined
    return ingestion
  }

  merge(ingestion: Partial<Ingestion>): Ingestion {
    Object.assign(this,ingestion)
    return this
  }

  offsetInHours(): number {
    if (!this.offset) throw new Error('No Offset')
    return tryParseUnit(this.offset, "hours")
  }

  doseInMg(): number {
    if (!this.dosage) throw new Error('No Dosage')
    return tryParseUnit(this.dosage, "mg")
  }

  halfLifeInHours(): number {
    if (!this.halfLife) throw new Error('No Halflife')
    return tryParseUnit(this.halfLife, "hours")
  }

  static intoChartData(ingestions: Ingestion[]): ChartData {
    try {
      const chartData: ChartData = {};
  
      for (const ingestion of ingestions) {
        if (!ingestion.dosage) return {}
        if (!ingestion.drugName) return {}
        if (!ingestion.offset) return {}
        if (!ingestion.halfLife) return {}

        if (!chartData[ingestion.drugName]) chartData[ingestion.drugName] = []
        const entry = chartData[ingestion.drugName];

        for (const [hour, dose] of calculateDecayRateHours(ingestion.doseInMg(), ingestion.halfLifeInHours()).entries()) {
          const offsetHour = ingestion.offsetInHours() + hour

          if (entry[offsetHour]) {
            entry[offsetHour].y += dose
            continue
          }
          entry.push({
            x: ingestion.offsetInHours() + hour,
            y: dose,
          });
        }        
      }
  
      return chartData;
    } catch (error) {
      return {}
    }
  }
}

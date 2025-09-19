import { unit } from "mathjs";

export function tryParseUnit(v: string, u: string): number {
  try {
    return unit(v).toNumber(u);
  } catch {
    return parseFloat(v);
  }
};

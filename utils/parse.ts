import { unit } from "mathjs";

export const tryParseUnit = (v: string, u: string): number => {
  try {
    return unit(v).toNumber(u);
  } catch {
    return parseFloat(v);
  }
};

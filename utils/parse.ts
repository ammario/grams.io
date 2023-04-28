import { unit } from "mathjs";

export const tryParseDuration = (v: string, u: string): number => {
  try {
    return unit(v).toNumber(u);
  } catch {
    return parseFloat(v);
  }
};

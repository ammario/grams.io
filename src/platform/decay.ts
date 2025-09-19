export function calculateDecayRate(
  dose: number,
  halfLife: number,
  steps: number
) {
  const decayConstant = Math.log(2) / halfLife;

  const decayArray = [];

  for (let t = 0; t < steps; t++) {
    const currentDose = dose * Math.exp(-decayConstant * t);
    decayArray.push(currentDose);
  }

  return [...decayArray, 0];
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
// src/app/utils/calorie-calculator.ts
import { ActivityLevel, ACTIVITY_FACTORS } from '../models/activity-level';

export type Objective = 'definicion' | 'mantenimiento' | 'volumen';

export function calculateDailyCalories(params: {
  peso: number;
  altura: number;
  edad: number;
  sexo: 'M' | 'F';
  nivelActividad: ActivityLevel;
  objetivo: Objective;
}): number {
  const { peso, altura, edad, sexo, nivelActividad, objetivo } = params;
  const s = sexo === 'M' ? 5 : -161;
  const tmb = 10 * peso + 6.25 * altura - 5 * edad + s;
  const factor = ACTIVITY_FACTORS[nivelActividad];
  let tdee = tmb * factor;
  if (objetivo === 'definicion')  tdee -= 500;
  if (objetivo === 'volumen')     tdee += 500;
  return Math.round(tdee);
}

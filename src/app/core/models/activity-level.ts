// models/activity-level.ts
export type ActivityLevel = 
  'sedentario' | 'ligera' | 'moderada' | 'intensa' | 'muy_intensa';

export const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentario:   1.2,   // poca o ninguna actividad
  ligera:       1.375, // 1–3 días/semana
  moderada:     1.55,  // 3–5 días/semana
  intensa:      1.725, // 6–7 días/semana
  muy_intensa:  1.9    // entrenos muy intensos o trabajo físico
};

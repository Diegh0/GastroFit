// src/app/pages/ia/ia.service.ts
import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

export interface MealPlanResponse {
  calorias: number;
  macros: { proteinas: number; grasas: number; carbos: number };
  menu: Record<string, { comida: string; platos: string[] }[]>;
}

@Injectable({ providedIn: 'root' })
export class IaService {
  constructor(private functions: Functions) {}

  generarMenu(params: {
    peso: number;
    altura: number;
    edad: number;
    sexo: 'M' | 'F';
    nivelActividad: string;
    objetivo: string;
    restricciones?: string;
  }): Promise<MealPlanResponse> {
    // httpsCallable devuelve una función que retorna Promise<HttpsCallableResult<T>>
    const fn = httpsCallable<typeof params, MealPlanResponse>(this.functions, 'generateMealPlan');
    return fn(params)
      .then(result => result.data);  // extraemos el .data, que es nuestro objeto MealPlanResponse
  }
}

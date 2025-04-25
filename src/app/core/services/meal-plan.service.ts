import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, CollectionReference, FirestoreDataConverter } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

export interface MealPlanRequest {
  peso: number;
  altura: number;
  edad: number;
  sexo: 'M' | 'F';
  nivelActividad: 'sedentario' | 'ligera' | 'moderada' | 'intensa' | 'muy_intensa';
  objetivo: 'definicion' | 'mantenimiento' | 'volumen';
  restricciones?: string[];
}

export interface Recipe {
  id?: string;
  nombre: string;
  tipoComida: 'Desayuno' | 'Almuerzo' | 'Merienda' | 'Cena' | 'Comida';
  caloriasTotales: number;
  proteinasTotales: number;
  grasasTotales: number;
  carbosTotales: number;
  restricciones: string[];
  ingredientes: Array<{
    nombre: string;
    gramos: number;
    caloriasPor100g: number;
    grasasPor100g: number;
    hidratosPor100g: number;
    proteinasPor100g: number;
  }>;
}

export interface ScaledIngredient {
  nombre: string;
  gramos: number;
}

export interface ScaledRecipe {
  base: Recipe;
  gramos: number;
  calorias: number;
  proteinas: number;
  grasas: number;
  carbos: number;
  ingredientes: ScaledIngredient[];
}

type DailyMenu = Record<'Desayuno' | 'Almuerzo' | 'Merienda' | 'Cena', ScaledRecipe>;

export interface MealPlanResponse {
  calorias: number;
  macros: { proteinas: number; grasas: number; carbos: number };
  menu: Record<string, DailyMenu>;
}

// Factores de actividad física
const ACTIVITY_FACTORS: Record<MealPlanRequest['nivelActividad'], number> = {
  sedentario: 1.2,
  ligera: 1.375,
  moderada: 1.55,
  intensa: 1.725,
  muy_intensa: 1.9
};

// Porción de calorías por comida
const CAL_PORTIONS: Record<keyof DailyMenu, number> = {
  Desayuno: 0.2,
  Almuerzo: 0.4,
  Merienda: 0.1,
  Cena: 0.3
};

// Converter para recetas tipadas
const recipeConverter: FirestoreDataConverter<Recipe> = {
  toFirestore(recipe: Recipe) {
    const { id, ...data } = recipe;
    return data;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)!;
    return { id: snapshot.id, ...data } as Recipe;
  }
};

@Injectable({ providedIn: 'root' })
export class MealPlanService {
  constructor(private firestore: Firestore) {}

  async generateMenu(req: MealPlanRequest): Promise<MealPlanResponse> {
    // ————— Cálculos iniciales —————
    const { peso, altura, edad, sexo, nivelActividad, objetivo } = req;
    if ([peso, altura, edad].some(v => v <= 0)) {
      throw new Error('Peso, altura y edad deben ser mayores que cero.');
    }
    const sFactor = sexo === 'M' ? 5 : -161;
    const tmb = 10 * peso + 6.25 * altura - 5 * edad + sFactor;
    let tdee = tmb * ACTIVITY_FACTORS[nivelActividad];
    if (objetivo === 'definicion') tdee -= 500;
    else if (objetivo === 'volumen')  tdee += 500;
    const caloriasTotales = Math.round(tdee);
  
    const proteinasTot = Math.round(1.8 * peso);
    const grasasTot    = Math.round((caloriasTotales * 0.25) / 9);
    const carbosTot    = Math.round((caloriasTotales - proteinasTot * 4 - grasasTot * 9) / 4);
  
    // ————— Carga de recetas —————
    const recipesRef = collection(this.firestore, 'recipes')
      .withConverter(recipeConverter) as CollectionReference<Recipe>;
    const allRecipes = await firstValueFrom(collectionData(recipesRef, { idField: 'id' }));
  
    // ————— Preparación de pools —————
    type MealType = keyof DailyMenu;
    const pools: Record<MealType, Recipe[]> = {
      Desayuno: allRecipes.filter(r => r.tipoComida === 'Desayuno'),
      // Consideramos tanto 'Almuerzo' como 'Comida' para el mismo pool
      Almuerzo: allRecipes.filter(r =>
        r.tipoComida === 'Almuerzo' || r.tipoComida === 'Comida'
      ),
      Merienda: allRecipes.filter(r => r.tipoComida === 'Merienda'),
      Cena:     allRecipes.filter(r => r.tipoComida === 'Cena'),
    };
    
  
    // Validar que haya al menos una receta por tipo
    (Object.keys(pools) as MealType[]).forEach(tipo => {
      if (pools[tipo].length === 0) {
        throw new Error(`No hay recetas disponibles para "${tipo}".`);
      }
    });
  
    // ————— Preselección para Almuerzo y Merienda —————
    const preselectCount = 3;
    const preselected: Record<'Almuerzo'|'Merienda', Recipe[]> = {
      Almuerzo: (() => {
        const base = pools.Almuerzo;
        const sorted = base.slice().sort((a, b) =>
          Math.abs(a.caloriasTotales - caloriasTotales * CAL_PORTIONS.Almuerzo)
          - Math.abs(b.caloriasTotales - caloriasTotales * CAL_PORTIONS.Almuerzo)
        );
        return sorted.length >= preselectCount ? sorted.slice(0, preselectCount) : sorted;
      })(),
      Merienda: (() => {
        const base = pools.Merienda;
        const sorted = base.slice().sort((a, b) =>
          Math.abs(a.caloriasTotales - caloriasTotales * CAL_PORTIONS.Merienda)
          - Math.abs(b.caloriasTotales - caloriasTotales * CAL_PORTIONS.Merienda)
        );
        return sorted.length >= preselectCount ? sorted.slice(0, preselectCount) : sorted;
      })()
    };
  
    // ————— Sets para controlar repeticiones —————
    const used = { Desayuno: new Set<string>(), Cena: new Set<string>() };
  
    // ————— Construcción del menú —————
    const dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    const menuArray = dias.map((dia, idx) => {
      const dailyMenu = {} as DailyMenu;
  
      (Object.keys(CAL_PORTIONS) as MealType[]).forEach(tipo => {
        let receta: Recipe;
  
        if (tipo === 'Almuerzo' || tipo === 'Merienda') {
          // Ciclar entre la preselección
          const list = preselected[tipo];
          receta = list[idx % list.length];
        } else {
          // Elegir primera no usada, sino repetir la primera del pool
          const pool = pools[tipo].filter(r => !used[tipo].has(r.id!));
          if (pool.length) {
            receta = pool[0];
            used[tipo].add(receta.id!);
          } else {
            receta = pools[tipo][0];
          }
        }
  
        // Escalado simple
        const gramos = receta.ingredientes.reduce((s, i) => s + i.gramos, 0);
        dailyMenu[tipo] = {
          base: receta,
          gramos,
          calorias: receta.caloriasTotales,
          proteinas: receta.proteinasTotales,
          grasas: receta.grasasTotales,
          carbos: receta.carbosTotales,
          ingredientes: receta.ingredientes.map(i => ({
            nombre: i.nombre,
            gramos: i.gramos
          }))
        };
      });
  
      return { dia, dailyMenu };
    });
  
    // ————— Transformar array en objeto ordenado —————
    const menu: Record<string, DailyMenu> = {};
    menuArray.forEach(entry => menu[entry.dia] = entry.dailyMenu);
  
    // ————— Resultado —————
    return {
      calorias: caloriasTotales,
      macros:    { proteinas: proteinasTot, grasas: grasasTot, carbos: carbosTot },
      menu
    };
  }
  
  
}

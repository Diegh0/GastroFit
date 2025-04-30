export interface Ingrediente {
  nombre: string;
  gramos: number;
  caloriasPor100g: number;
  proteinas: number;
  grasas: number;
  hidratos: number;
}
  export interface Comida {
    id?: string;
    nombre: string;
    ingredientes: Ingrediente[];
    imagenUrl?: string;
    favorita: boolean;
    fechaCreacion: Date;
    asin?:string;
    source?: 'manual' | 'ia';
  }

export interface PlanificacionSemanal {
  [franja: string]: {
    [dia: string]: Comida[];
  };
  
}
export interface AfiliadoProducto {
  title: string;
  asin: string;
  imageUrl: string;
  link:string;
}
export interface Recipe {
  id?:string;
  nombre: string;
  tipoComida: 'Desayuno'|'Comida'|'Almuerzo'|'Merienda'|'Cena';
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


  
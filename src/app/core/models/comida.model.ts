export interface Ingrediente {
  nombre: string;
  gramos: number;
  caloriasPor100g: number;
  proteinas: number;
  grasas: number;
  hidratos: number;
}
  export interface Comida {
    id: string;
    nombre: string;
    ingredientes: Ingrediente[];
    imagenUrl?: string;
    favorita: boolean;
    fechaCreacion: Date;
  }
  
  
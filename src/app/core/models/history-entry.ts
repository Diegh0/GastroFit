import { Ingrediente } from "./comida.model";

// models/history-entry.ts
export interface HistoryEntry {
    id?: string;
    dia: string; // Lunes–Domingo
    tipo: 'Desayuno' | 'Almuerzo' | 'Merienda' | 'Cena';
    recipeId: string;
    nombre: string;
    fechaGeneracion: Date; // o Timestamp si lo prefieres
    source?: 'manual' | 'ia'; // opcional para trazabilidad
    favorita: boolean;
    imagenUrl: string;
    ingredientes: Ingrediente[]; 
  }
  
  // models/history-entry-ia.ts
  export interface HistoryEntryIA extends HistoryEntry {
    migrado?: boolean;
  }
  
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Comida } from 'src/app/core/models/comida.model';
import { ComidaService } from 'src/app/core/services/comida.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planificador-semanal',
  templateUrl: './planificador-semanal.component.html',
  styleUrls: ['./planificador-semanal.component.scss'],
  imports: [CommonModule, DragDropModule], // 👈 esto es CLAVE

})
export class PlanificadorSemanalComponent implements OnInit {
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  franjas = ['Desayuno', 'Comida', 'Merienda', 'Cena'];
  comidasDisponibles: Comida[] = [];
  planificacion: { [franja: string]: { [dia: string]: Comida[] } } = {};
  celdasIds: string[] = [];
  mostrarResumenSemanal: boolean = false;
  resumenSemanal: { calorias: number, proteinas: number, grasas: number, hidratos: number } | null = null;
  resumenPorDia: { [dia: string]: { calorias: number, proteinas: number, grasas: number, hidratos: number } } = {};
mostrarResumenDia: { [dia: string]: boolean } = {};

  
  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.comidasDisponibles = this.comidaService.getComidas();
  
    const guardado = localStorage.getItem('planificacion');
    if (guardado) {
      this.planificacion = JSON.parse(guardado);
      console.log('🔁 Planificación cargada de localStorage:', this.planificacion);
    } else {
      this.franjas.forEach(franja => {
        this.planificacion[franja] = {};
        this.dias.forEach(dia => {
          this.planificacion[franja][dia] = [];
        });
      });
    }
  
    this.celdasIds = [];
    this.franjas.forEach(franja => {
      this.dias.forEach(dia => {
        this.celdasIds.push(`celda-${dia}-${franja}`);
      });
    });
  }
  
  
  verResumenSemanal(): void {
    this.resumenSemanal = this.calcularResumenSemanal();
    this.mostrarResumenSemanal = true;
  }
  
  onDrop(event: CdkDragDrop<Comida[]>, dia: string, franja: string) {
    if (event.previousContainer.id === 'lista-comidas') {
      const comida = { ...event.item.data };
      delete comida.imagen; // 👈 elimina la propiedad imagen antes de guardar

      this.planificacion[franja][dia].push(comida);
  
      // 🔥 Guardar inmediatamente tras drop
      localStorage.setItem('planificacion', JSON.stringify(this.planificacion));
      console.log('💾 Planificación guardada:', this.planificacion);
    }
  }
  
  eliminarComida(dia: string, franja: string, index: number): void {
    this.planificacion[franja][dia].splice(index, 1);
    localStorage.setItem('planificacion', JSON.stringify(this.planificacion));
    console.log(`🗑️ Comida eliminada de ${franja} - ${dia}`);
  }
  
  agregarFranja(): void {
    const nueva = prompt('Nombre de la nueva franja (Ej: Almuerzo)');
    if (nueva && !this.franjas.includes(nueva)) {
      this.franjas.push(nueva);
      this.planificacion[nueva] = {};
      this.dias.forEach(dia => {
        this.planificacion[nueva][dia] = [];
      });
    }
  }
  calcularResumenSemanal(): { calorias: number, proteinas: number, grasas: number, hidratos: number } {
    const resumen = {
      calorias: 0,
      proteinas: 0,
      grasas: 0,
      hidratos: 0
    };
  
    for (const franja of this.franjas) {
      for (const dia of this.dias) {
        const comidas = this.planificacion[franja][dia];
        for (const comida of comidas) {
          for (const ing of comida.ingredientes) {
            const factor = ing.gramos / 100;
            resumen.calorias += ing.caloriasPor100g * factor;
            resumen.proteinas += ing.proteinas * factor;
            resumen.grasas += ing.grasas * factor;
            resumen.hidratos += ing.hidratos * factor;
          }
        }
      }
    }
  
    // Redondear valores
    return {
      calorias: Math.round(resumen.calorias),
      proteinas: Math.round(resumen.proteinas),
      grasas: Math.round(resumen.grasas),
      hidratos: Math.round(resumen.hidratos)
    };
  }

  calcularResumenPorDia(dia: string): void {
    const resumen = {
      calorias: 0,
      proteinas: 0,
      grasas: 0,
      hidratos: 0
    };
  
    for (const franja of this.franjas) {
      const comidas = this.planificacion[franja][dia];
      for (const comida of comidas) {
        for (const ing of comida.ingredientes) {
          const factor = ing.gramos / 100;
          resumen.calorias += ing.caloriasPor100g * factor;
          resumen.proteinas += ing.proteinas * factor;
          resumen.grasas += ing.grasas * factor;
          resumen.hidratos += ing.hidratos * factor;
        }
      }
    }
  
    this.resumenPorDia[dia] = {
      calorias: Math.round(resumen.calorias),
      proteinas: Math.round(resumen.proteinas),
      grasas: Math.round(resumen.grasas),
      hidratos: Math.round(resumen.hidratos)
    };
  
    this.mostrarResumenDia[dia] = !this.mostrarResumenDia[dia]; // Toggle
  }
  
  
}

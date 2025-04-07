import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Comida } from 'src/app/core/models/comida.model';
import { ComidaService } from 'src/app/core/services/comida.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planificador-semanal',
  templateUrl: './planificador-semanal.component.html',
  styleUrls: ['./planificador-semanal.component.scss'],
  imports: [CommonModule, DragDropModule,FormsModule], // 👈 esto es CLAVE

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
  fechaSemana: string = this.obtenerLunesDesdeFecha(new Date().toISOString().split('T')[0]);
  mostrarDuplicador = false;
  fechaDuplicar: string = '';
  

  
  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.comidasDisponibles = this.comidaService.getComidas();
    const datosGuardados = localStorage.getItem('planificaciones');
    const todas = datosGuardados ? JSON.parse(datosGuardados) : {};
  
    if (todas[this.fechaSemana]) {
      this.planificacion = todas[this.fechaSemana];
    } else {
      // Crear estructura vacía
      this.franjas.forEach(franja => {
        this.planificacion[franja] = {};
        this.dias.forEach(dia => {
          this.planificacion[franja][dia] = [];
        });
      });
    }
  
    // Celdas IDs
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
      const datosGuardados = localStorage.getItem('planificaciones');
      const todas = datosGuardados ? JSON.parse(datosGuardados) : {};
      todas[this.fechaSemana] = this.planificacion;
      localStorage.setItem('planificaciones', JSON.stringify(todas));
      
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
  obtenerLunesDesdeFecha(fecha: string): string {
    const date = new Date(fecha);
    const dia = date.getDay();
    const diff = date.getDate() - dia + (dia === 0 ? -6 : 1); // Ajuste si es domingo
    const lunes = new Date(date.setDate(diff));
    return lunes.toISOString().split('T')[0];
  }
  

  cambiarSemana(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fechaSeleccionada = input?.value;
    if (!fechaSeleccionada) return;
  
    const lunesSemana = this.obtenerLunesDesdeFecha(fechaSeleccionada);
    this.fechaSemana = lunesSemana;
    this.mostrarResumenDia = {};
    const datosGuardados = localStorage.getItem('planificaciones');
    const todas = datosGuardados ? JSON.parse(datosGuardados) : {};
  
    if (todas[this.fechaSemana]) {
      this.planificacion = todas[this.fechaSemana];
    } else {
      this.planificacion = {};
      this.franjas.forEach(franja => {
        this.planificacion[franja] = {};
        this.dias.forEach(dia => {
          this.planificacion[franja][dia] = [];
        });
      });
    }
  
    // Actualizar celdasIds
    this.celdasIds = [];
    this.franjas.forEach(franja => {
      this.dias.forEach(dia => {
        this.celdasIds.push(`celda-${dia}-${franja}`);
      });
    });
  }
  ejecutarDuplicado(): void {
    if (!this.fechaDuplicar) return;
  
    const lunesDestino = this.obtenerLunesDesdeFecha(this.fechaDuplicar);
    const datosGuardados = localStorage.getItem('planificaciones');
    const todas = datosGuardados ? JSON.parse(datosGuardados) : {};
  
    if (todas[lunesDestino]) {
      const sobreescribir = confirm(`Ya existe una semana para el ${lunesDestino}. ¿Deseas sobrescribirla?`);
      if (!sobreescribir) return;
    }
  
    const copia = JSON.parse(JSON.stringify(this.planificacion));
    todas[lunesDestino] = copia;
    localStorage.setItem('planificaciones', JSON.stringify(todas));
  
    alert(`✅ Semana actual duplicada al ${lunesDestino}`);
    this.mostrarDuplicador = false;
    this.fechaDuplicar = '';
  }
  
  

}

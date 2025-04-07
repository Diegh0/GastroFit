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
}

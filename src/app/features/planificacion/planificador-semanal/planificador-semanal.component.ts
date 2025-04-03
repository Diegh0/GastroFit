import { Component, OnInit } from '@angular/core';
import { Comida } from 'src/app/core/models/comida.model';
import { ComidaService } from 'src/app/core/services/comida.service';

@Component({
  selector: 'app-planificador-semanal',
  templateUrl: './planificador-semanal.component.html',
  styleUrls: ['./planificador-semanal.component.scss']
})
export class PlanificadorSemanalComponent implements OnInit {
  comidasDisponibles: Comida[] = [];
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  franjas: string[] = ['Desayuno', 'Comida', 'Merienda', 'Cena'];

  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.comidasDisponibles = this.comidaService.getComidas();
  }

  agregarFranja(): void {
    const nueva = prompt('Nombre de la nueva franja (Ej: Almuerzo)');
    if (nueva) {
      this.franjas.push(nueva);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comida } from 'src/app/core/models/comida.model';
import { ComidaService } from 'src/app/core/services/comida.service';
import { IaHistoryService } from 'src/app/core/services/ia-history.service';

@Component({
    selector: 'app-comida-detalle',
    templateUrl: './comida-detalle.component.html',
    styleUrls: ['./comida-detalle.component.scss'],
    standalone: false
})
export class ComidaDetalleComponent implements OnInit {
  comida: Comida | undefined;

  constructor(
    private route: ActivatedRoute,
    private comidaService: ComidaService,
    private iaHistoryService: IaHistoryService

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
  
    // Primero intenta cargar desde comidas normales
    this.comida = this.comidaService.getComidaPorId(id);
  
    // Si no se encuentra, buscar en comidas IA
    if (!this.comida) {
      this.iaHistoryService.getIaHistory().subscribe(iaEntries => {
        const ia = iaEntries.find(entry => entry.recipeId === id);
        if (ia) {
          this.comida = {
            id: ia.recipeId,
            nombre: ia.nombre,
            ingredientes: ia.ingredientes ?? [],
            imagenUrl: ia.imagenUrl || 'assets/imgPredeterminadaCars.png',
            favorita: ia.favorita ?? false,
            fechaCreacion: ia.fechaGeneracion,
            source: 'ia'
          };
        }
      });
    }
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comida } from 'src/app/core/models/comida.model';
import { ComidaService } from 'src/app/core/services/comida.service';

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
    private comidaService: ComidaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.comida = this.comidaService.getComidaPorId(id);
    }
  }
}

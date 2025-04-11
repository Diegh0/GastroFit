import { Component, OnInit } from '@angular/core';
import { Comida } from 'src/app/core/models/comida.model';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.scss'],
  standalone: false
})
export class ComidasComponent implements OnInit {
  comidas: Comida[] = [];
  mostrarSoloFavoritos: boolean = false;

  constructor() {}

  ngOnInit(): void {
    
  }

  agregarComida(nueva: Comida): void {
  }

  toggleFavorito(comida: Comida): void {
   
    
  }

  eliminarComida(comida: Comida): void {
  }

  get comidasFiltradas(): Comida[] {
    return this.mostrarSoloFavoritos
      ? this.comidas.filter(c => c.favorita)
      : this.comidas;
  }
}

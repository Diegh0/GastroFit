import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comida } from 'src/app/core/models/comida.model';

@Component({
  selector: 'app-comida-list',
  templateUrl: './comida-list.component.html',
  styleUrls: ['./comida-list.component.scss']
})
export class ComidaListComponent {
  @Input() comidas: Comida[] = [];
  @Output() favoritoCambiado = new EventEmitter<Comida>();
  @Output() comidaEliminada = new EventEmitter<Comida>();

  toggleFavorito(comida: Comida): void {
    this.favoritoCambiado.emit(comida);
  }

  eliminarComida(comida: Comida): void {
    this.comidaEliminada.emit(comida);
  }
}

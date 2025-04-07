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

  ngOnInit(): void {
    const guardadas = localStorage.getItem('comidas');
    if (guardadas) {
      this.comidas = JSON.parse(guardadas);
    }
  }

  agregarComida(nueva: Comida): void {
    this.comidas.unshift(nueva);
    this.guardarEnLocalStorage();
  }

  toggleFavorito(comida: Comida): void {
    comida.favorita = !comida.favorita;
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('comidas', JSON.stringify(this.comidas));
  }
  eliminarComida(comida: Comida): void {
    this.comidas = this.comidas.filter(c => c.id !== comida.id);
    this.guardarEnLocalStorage();
  }

get comidasFiltradas(): Comida[] {
  return this.mostrarSoloFavoritos
    ? this.comidas.filter(c => c.favorita)
    : this.comidas;
}
}

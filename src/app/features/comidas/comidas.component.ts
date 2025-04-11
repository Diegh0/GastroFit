import { Component, OnInit } from '@angular/core';
import { Comida } from 'src/app/core/models/comida.model';
import { ComidaService } from 'src/app/core/services/comida.service';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.scss'],
  standalone: false
})
export class ComidasComponent implements OnInit {
  comidas: Comida[] = [];
  mostrarSoloFavoritos: boolean = false;

  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.comidaService.getComidas().then(comidas => {
      this.comidas = comidas;
    });
  }
  

  agregarComida(nueva: Comida): void {
    this.comidas.push(nueva); // 👈 Añadir sin recargar
  }

  toggleFavorito(comida: Comida): void {
    const index = this.comidas.findIndex(c => c.id === comida.id);
    if (index !== -1) {
      this.comidas[index].favorita = !this.comidas[index].favorita;
      this.comidaService.setComidas(this.comidas);
    }
  }
  

  eliminarComida(comida: Comida): void {
    this.comidas = this.comidas.filter(c => c.id !== comida.id);
    this.comidaService.setComidas(this.comidas);
  }
  

  get comidasFiltradas(): Comida[] {
    return this.mostrarSoloFavoritos
      ? this.comidas.filter(c => c.favorita)
      : this.comidas;
  }
}

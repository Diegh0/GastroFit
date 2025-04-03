import { Injectable } from '@angular/core';
import { Comida } from '../models/comida.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private comidas: Comida[] = [];

  setComidas(data: Comida[]) {
    this.comidas = data;
    localStorage.setItem('comidas', JSON.stringify(data));
  }

  getComidas(): Comida[] {
    if (!this.comidas.length) {
      const guardadas = localStorage.getItem('comidas');
      if (guardadas) this.comidas = JSON.parse(guardadas);
    }
    return this.comidas;
  }

  getComidaPorId(id: string): Comida | undefined {
    return this.getComidas().find(c => c.id === id);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AfiliadoProducto, Comida } from 'src/app/core/models/comida.model';
import { AffiliateService } from 'src/app/services/affiliate.service';

@Component({
    selector: 'app-comida-list',
    templateUrl: './comida-list.component.html',
    styleUrls: ['./comida-list.component.scss'],
    standalone: false
})
export class ComidaListComponent {
  @Input() comidas: Comida[] = [];
  @Output() favoritoCambiado = new EventEmitter<Comida>();
  @Output() comidaEliminada = new EventEmitter<Comida>();

  constructor(public affiliate: AffiliateService) {}

  

  toggleFavorito(comida: Comida): void {
    this.favoritoCambiado.emit(comida);
  }

  eliminarComida(comida: Comida): void {
    this.comidaEliminada.emit(comida);
    
  }

  scrollAlFormulario(): void {
    const formulario = document.getElementById('formulario-comida');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth' });
    }
  }
 
  
 
    
   
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AfiliadoProducto, Comida } from 'src/app/core/models/comida.model';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/shared/confirm-dialog/confirm-dialog.component';

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

  constructor(public affiliate: AffiliateService,private dialog: MatDialog) {}

  

  toggleFavorito(comida: Comida): void {
    this.favoritoCambiado.emit(comida);
  }

  eliminarComida(comida: Comida): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { mensaje: `¿Eliminar la comida "${comida.nombre}"?` },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.comidaEliminada.emit(comida);
      }
    });
  }

  scrollAlFormulario(): void {
    const formulario = document.getElementById('formulario-comida');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth' });
    }
  }
 
  
 
    
   
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComidasRoutingModule } from './comidas-routing.module';
import { ComidasComponent } from './comidas.component';
import { ComidaFormComponent } from './comida-form/comida-form.component';
import { ComidaListComponent } from './comida-list/comida-list.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ComidaDetalleComponent } from './comida-detalle/comida-detalle.component'; // ✅ AÑADE ESTO


@NgModule({
  declarations: [
    ComidasComponent,
    ComidaFormComponent,
    ComidaListComponent,
    ComidaDetalleComponent
  ],
  imports: [
    CommonModule,
    ComidasRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class ComidasModule { }

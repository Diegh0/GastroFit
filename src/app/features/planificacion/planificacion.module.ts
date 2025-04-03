import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificacionRoutingModule } from './planificacion-routing.module';
import { PlanificacionComponent } from './planificacion.component';
import { PlanificadorSemanalComponent } from './planificador-semanal/planificador-semanal.component';


@NgModule({
  declarations: [
    PlanificacionComponent,
    PlanificadorSemanalComponent
  ],
  imports: [
    CommonModule,
    PlanificacionRoutingModule
  ]
})
export class PlanificacionModule { }

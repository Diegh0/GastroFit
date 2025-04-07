import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificacionRoutingModule } from './planificacion-routing.module';
import { PlanificacionComponent } from './planificacion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlanificadorSemanalComponent } from './planificador-semanal/planificador-semanal.component';


@NgModule({
  declarations: [
    PlanificacionComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    PlanificacionRoutingModule ,
    PlanificadorSemanalComponent 
  ]
})
export class PlanificacionModule { }

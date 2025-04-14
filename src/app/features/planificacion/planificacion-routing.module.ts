import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanificacionComponent } from './planificacion.component';
import { PlanificadorSemanalComponent } from './planificador-semanal/planificador-semanal.component';
const routes: Routes = [
  {
    path: '',
    component: PlanificadorSemanalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanificacionRoutingModule { }

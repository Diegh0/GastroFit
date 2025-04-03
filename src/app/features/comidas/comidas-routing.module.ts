import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComidasComponent } from './comidas.component';

const routes: Routes = [
  { path: '', component: ComidasComponent },
  //{ path: ':id', component: ComidaDetalleComponent } // ✅ ESTA es la que necesitas
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComidasRoutingModule { }

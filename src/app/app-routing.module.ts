import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'comidas',
        loadChildren: () =>
          import('./features/comidas/comidas.module').then(m => m.ComidasModule),
      },
      {
        path: 'planificacion',
        loadChildren: () =>
          import('./features/planificacion/planificacion.module').then(m => m.PlanificacionModule),
      },
      {
        path: '',
        redirectTo: 'comidas',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'planificacion', loadChildren: () => import('./features/planificacion/planificacion.module').then(m => m.PlanificacionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

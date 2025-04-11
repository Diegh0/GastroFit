import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard'; // 🔐 Asegúrate de tenerlo creado



const routes: Routes = [
  // Rutas públicas
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth/auth.component').then(m => m.AuthComponent)
  },

  // Rutas protegidas con layout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },

      {
        path: 'comidas',
        canActivate: [AuthGuard], // 🔒
        loadChildren: () =>
          import('./features/comidas/comidas.module').then(m => m.ComidasModule)
      },
      {
        path: 'planificacion',
        canActivate: [AuthGuard], // 🔒
        loadChildren: () =>
          import('./features/planificacion/planificacion.module').then(m => m.PlanificacionModule)
      }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

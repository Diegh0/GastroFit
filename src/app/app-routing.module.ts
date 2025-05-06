import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { IaComponent } from './pages/ia/ia.component';
import { VerificacionComponent } from './auth/verificacion/verificacion.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProgresoComponent } from './pages/perfil/progreso/progreso.component';

const routes: Routes = [
  // Ruta para login/registro
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'verificacion',
    component: VerificacionComponent
  },
  

  // Ruta principal con layout compartido
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent }, // 🔓 pública

      {
        path: 'comidas',
        canActivate: [AuthGuard], // 🔐 protegida
        loadChildren: () =>
          import('./features/comidas/comidas.module').then(m => m.ComidasModule)
      },
      {
        path: 'planificacion',
        canActivate: [AuthGuard], // 🔐 protegida
        loadChildren: () =>
          import('./features/planificacion/planificacion.module').then(m => m.PlanificacionModule)
      },
      { path: 'ia', component: IaComponent }, // 🔓 pública
      {
        path: 'perfil',
        children: [
          {
            path: '',
            component: PerfilComponent
          },
          {
            path: 'progreso',
            component: ProgresoComponent
          }
        ]
      },
    ]
  },
  
  // Fallback: redirige a home si no se encuentra ruta
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

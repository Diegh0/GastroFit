import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  deferredPrompt: any = null;
  mostrarBotonInstalar = false;

  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.mostrarBotonInstalar = true;
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  comenzar() {
    if (this.user) {
      this.router.navigate(['/planificacion']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  instalarApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();

      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ El usuario aceptó instalar la app');
        } else {
          console.log('❌ El usuario rechazó instalar la app');
        }
        this.deferredPrompt = null;
        this.mostrarBotonInstalar = false;
      });
    }
  }
}

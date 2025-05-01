import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  deferredPrompt: any = null;
  mostrarBotonInstalar = false;

  constructor() {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault(); // Evita que el navegador lo muestre automáticamente
      this.deferredPrompt = event;
      this.mostrarBotonInstalar = true;
    });
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

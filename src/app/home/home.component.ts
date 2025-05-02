import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';
import { InstallPromptService } from '../services/install-prompt.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  deferredPrompt: any = null;
  mostrarBotonInstalar = false;

  user: User | null = null;
  mostrarBurbuja = false;
  mostrarGuiaIOS = false;

  constructor(
    private installPromptService: InstallPromptService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any)['standalone'] === true;
  
    this.installPromptService.getPromptEvent$().subscribe((event) => {
      this.mostrarBotonInstalar = !isStandalone && !!event;
  
      if (this.mostrarBotonInstalar) {
        this.mostrarBurbuja = true;
        setTimeout(() => {
          this.mostrarBurbuja = false;
        }, 6000);
      }
    });
    const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    
    if (isIOS && !isStandalone) {
      this.mostrarGuiaIOS = true;
    }
    console.log('iOS detectado?', isIOS);
    console.log('Standalone?', isStandalone);

    
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  
  cerrarGuiaIOS() {
    this.mostrarGuiaIOS = false;
  }
  

  comenzar() {
    if (this.user) {
      this.router.navigate(['/planificacion']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  instalarApp() {
    const promptEvent = this.installPromptService.getPromptEvent();
    if (promptEvent) {
      promptEvent.prompt();
  
      promptEvent.userChoice.then((result: any) => {
        if (result.outcome === 'accepted') {
          console.log('✅ Usuario aceptó instalar');
        } else {
          console.log('❌ Usuario rechazó instalar');
        }
        this.installPromptService.clearPrompt();
        this.mostrarBotonInstalar = false;
      });
    }
}
}

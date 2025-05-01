import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'firebase/auth';
import { InstallPromptService } from 'src/app/services/install-prompt.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: false
})
export class MainLayoutComponent {
  menuAbierto = false;
  user$: Observable<User | null>;
  mostrarBotonInstalar = false;

  constructor(private authService: AuthService, private router: Router,private installPromptService: InstallPromptService) {
    this.mostrarBotonInstalar = !!this.installPromptService.getPromptEvent();
    this.user$ = this.authService.user$;
  }
 
 
 
  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  logout() {
     this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
 

  instalarApp() {
    const prompt = this.installPromptService.getPromptEvent();
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((res: any) => {
        if (res.outcome === 'accepted') {
          console.log('✅ Instalación aceptada');
        } else {
          console.log('❌ Instalación cancelada');
        }
        this.installPromptService.clearPrompt();
        this.mostrarBotonInstalar = false;
      });
    }
  }
}

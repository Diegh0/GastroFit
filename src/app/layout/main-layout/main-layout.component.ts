import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: false
})
export class MainLayoutComponent implements OnInit{
  menuAbierto = false;
  user$: Observable<User | null>;
  deferredPrompt: any = null;
  mostrarBotonInstalar = false;
  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
  }
  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.mostrarBotonInstalar = true;
    });
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
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();

      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ App instalada');
        } else {
          console.log('❌ Usuario canceló');
        }

        this.deferredPrompt = null;
        this.mostrarBotonInstalar = false;
      });
    }
  }
}

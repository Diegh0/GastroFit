import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { reload, sendEmailVerification } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.scss']
})
export class VerificacionComponent {
  loading = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async revisarVerificacion() {
    const user = this.auth.currentUser;
    if (user) {
      await reload(user);
      if (user.emailVerified) {
        this.snackBar.open('Correo verificado con éxito. Bienvenido 😎', 'Cerrar', {
          duration: 4000,
        });
        this.router.navigate(['/']); // Cambia por la ruta principal que uses
      } else {
        this.snackBar.open('Tu correo aún no está verificado 😕', 'Cerrar', {
          duration: 4000,
        });
      }
    }
  }

  async reenviarCorreo() {
    const user = this.auth.currentUser;
    if (user) {
      this.loading = true;
      try {
        await sendEmailVerification(user);
        this.snackBar.open('Correo de verificación reenviado ✉️', 'Cerrar', {
          duration: 4000,
        });
      } catch (error) {
        console.error(error);
        this.snackBar.open('Error al reenviar el correo 😓', 'Cerrar', {
          duration: 4000,
        });
      } finally {
        this.loading = false;
      }
    }
  }
}

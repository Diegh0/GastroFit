import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    // Animación para la entrada de la vista completa (fade in con desplazamiento)
    trigger('pageLoad', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // Animación para el cambio entre formularios (login y registro)
    trigger('toggleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {
  showRegister = false;
  email = '';
  password = '';
  confirmPassword = '';
  isMobile = false;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.checkViewport();
  }

  @HostListener('window:resize')
  checkViewport() {
    // Considera mobile si el ancho es menor o igual a 768px
    this.isMobile = window.innerWidth <= 768;
  }

  toggle() {
    this.showRegister = !this.showRegister;
  }

  login() {
    if (!this.email || !this.password) {
      this.snackBar.open('Por favor, completa todos los campos', 'Cerrar', { duration: 3000 });
      return;
    }
    this.auth.login(this.email, this.password)
      .then(() => {
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.error("Error en login:", err); // Para depurar
        let mensaje = 'Error en el inicio de sesión';
        
        // Firebase no da detalles por seguridad, pero puedes distinguir algunos casos comunes:
        if (err.code === 'auth/user-not-found') {
          mensaje = 'Correo no registrado';
        } else if (err.code === 'auth/wrong-password') {
          mensaje = 'Contraseña incorrecta';
        } else if (err.code === 'auth/invalid-credential') {
          mensaje = 'Correo o contraseña incorrectos';
        }
      
        this.snackBar.open(`Error: ${mensaje}`, 'Cerrar', { duration: 3000 });
      });
      
  }

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.snackBar.open('Por favor, completa todos los campos', 'Cerrar', { duration: 3000 });
      return;
    }
  
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(this.email.toLowerCase())) {
      this.snackBar.open('Correo electrónico inválido', 'Cerrar', { duration: 3000 });
      return;
    }
  
    // Requisitos de contraseña
    const requisitos = [
      { regex: /^.{6,}$/, mensaje: 'Al menos 6 caracteres' },
      { regex: /[A-Z]/, mensaje: 'Una letra mayúscula' },
      { regex: /[a-z]/, mensaje: 'Una letra minúscula' },
      { regex: /[0-9]/, mensaje: 'Un número' }
    ];
  
    const errores = requisitos.filter(r => !r.regex.test(this.password)).map(r => r.mensaje);
    if (errores.length > 0) {
      this.snackBar.open(`La contraseña debe tener: ${errores.join(', ')}`, 'Cerrar', { duration: 5000 });
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
      return;
    }
  
    this.auth.register(this.email, this.password)
      .then(() => {
        this.snackBar.open('Registro exitoso. Verifica tu correo antes de continuar.', 'Cerrar', {
          duration: 4000,
        });
        this.router.navigate(['/verificacion']);
      })
      .catch(err => {
        console.error("Error en registro:", err);
        let mensaje = 'Error en el registro';
        if (err.code === 'auth/email-already-in-use') {
          mensaje = 'El correo ya está registrado';
        } else if (err.code === 'auth/invalid-email') {
          mensaje = 'El formato del correo no es válido';
        } else if (err.code === 'auth/weak-password') {
          mensaje = 'Contraseña demasiado débil';
        }
  
        this.snackBar.open(`Error: ${mensaje}`, 'Cerrar', { duration: 3000 });
      });
  }
  
  volver() {
    this.router.navigate(['/']);
  }
  recuperarContrasena() {
    if (!this.email) {
      this.snackBar.open('Introduce tu correo para restablecer la contraseña', 'Cerrar', {
        duration: 3000
      });
      return;
    }
  
    this.auth.enviarEmailRecuperacion(this.email)
      .then(() => {
        this.snackBar.open('Se ha enviado un correo para restablecer la contraseña', 'Cerrar', {
          duration: 4000
        });
      })
      .catch(() => {
        this.snackBar.open('Error al enviar el correo de recuperación', 'Cerrar', {
          duration: 3000
        });
      });
  }
  
}

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
    MatSnackBarModule
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
        let mensaje = 'Error en el inicio de sesión';
        if (err.code === 'auth/user-not-found') {
          mensaje = 'Correo no registrado';
        } else if (err.code === 'auth/wrong-password') {
          mensaje = 'Contraseña incorrecta';
        }
        this.snackBar.open(`Error: ${mensaje}`, 'Cerrar', { duration: 3000 });
      });
  }

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.snackBar.open('Por favor, completa todos los campos', 'Cerrar', { duration: 3000 });
      return;
    }
    // Validar formato de correo (adicional al validador HTML)
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(this.email.toLowerCase())) {
      this.snackBar.open('Correo electrónico inválido', 'Cerrar', { duration: 3000 });
      return;
    }
    // Validar que la contraseña tenga al menos 6 caracteres
    if (this.password.length < 6) {
      this.snackBar.open('La contraseña debe tener al menos 6 caracteres', 'Cerrar', { duration: 3000 });
      return;
    }
    // Verificar que ambas contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
      return;
    }
    this.auth.register(this.email, this.password)
      .then(() => {
        this.snackBar.open('Registro exitoso, bienvenido!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/planificacion']);
      })
      .catch(err => {
        let mensaje = 'Error en el registro';
        if (err.code === 'auth/email-already-in-use') {
          mensaje = 'El correo ya está registrado';
        }
        this.snackBar.open(`Error: ${mensaje}`, 'Cerrar', { duration: 3000 });
      });
  }
}

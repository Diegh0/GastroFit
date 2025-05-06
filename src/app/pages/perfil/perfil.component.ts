import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  imports:[   MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  RouterLink ,
  FormsModule],
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  nombre: string = '';
  correo: string = '';
  peso: number | null = null;
  altura: number | null = null;
  guardado: boolean = false;

  constructor(
    private perfilService: PerfilService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    // 1. Obtener datos desde Firestore
    const data = await this.perfilService.getPerfil();
    this.peso = data!['peso'] ?? null;
    this.altura = data!['altura'] ?? null;
  
    // 2. Cargar correo desde Firebase Auth
    const user = await this.authService.getUserData();
    this.correo = user?.email ?? '';
  
    // 3. Cargar nombre, primero desde Firestore
    if (data!['nombre'] && data!['nombre'].trim() !== '') {
      this.nombre = data!['nombre'];
    } else if (user?.displayName) {
      this.nombre = user.displayName;
    } else {
      this.nombre = '';
    }
  
    console.log('Nombre final mostrado en perfil:', this.nombre);
  }
  
  
  

  async actualizarDatos() {
    const nombreLimpio = this.nombre?.trim();
  
    if (
      nombreLimpio &&
      this.peso !== null &&
      this.altura !== null &&
      this.peso > 0 &&
      this.altura > 0
    ) {
      console.log('Actualizando perfil con:', nombreLimpio, this.peso, this.altura);
  
      await this.perfilService.actualizarPerfil({
        nombre: nombreLimpio,
        peso: this.peso,
        altura: this.altura
      });
  
      await this.authService.updateDisplayName(nombreLimpio);
  
      this.guardado = true;
      setTimeout(() => (this.guardado = false), 2000);
    } else {
      console.warn('Validación fallida:', {
        nombre: this.nombre,
        peso: this.peso,
        altura: this.altura
      });
    }
  }
  async insertarPesosDePrueba() {
    const meses = [0, 1, 2, 3]; // enero a abril
    const año = 2025;
    const basePeso = 85;
  
    for (const mes of meses) {
      const fecha = new Date(año, mes, 1);
      const valor = basePeso - mes; // Ej: 85, 84, 83, 82...
      await this.perfilService.insertarPesoManual(valor, fecha);
    }
  
    console.log('Pesos de prueba insertados');
  }
  volver() {
    this.router.navigate(['/']);
  }  
  
  
}

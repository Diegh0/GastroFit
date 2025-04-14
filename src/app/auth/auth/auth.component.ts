import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  showRegister = false;
  email = '';
  password = '';
  isMobile = false;

  constructor(private auth: AuthService, private router: Router) {}

  toggle() {
    this.showRegister = !this.showRegister;
  }
  

  login() {
    this.auth.login(this.email, this.password)
      .then(() => this.router.navigate(['/home']))
      .catch(err => alert('Error: ' + err.message));
  }

  register() {
    this.auth.register(this.email, this.password)
      .then(() => this.router.navigate(['/planificacion']))
      .catch(err => alert('Error: ' + err.message));
  }
  
}

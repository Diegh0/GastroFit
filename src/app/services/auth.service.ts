import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged, reload, sendEmailVerification, sendPasswordResetEmail, User } from 'firebase/auth';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { updateProfile } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, async user => {
      if (user) await reload(user); // Asegura que emailVerified esté actualizado
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(cred.user);
    return cred;
  }

  logout() {
    return signOut(this.auth);
  }

  getUserId(): string | null {
    return this.auth.currentUser?.uid || null;
  }
  isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }
  async getUserIdAsync(): Promise<string | null> {
    const user = await firstValueFrom(this.user$);
    return user?.uid || null;
  }
  async getUserData() {
    return this.auth.currentUser;
  }


  async updateDisplayName(nombre: string) {
    console.log('Actualizando Firebase Auth con nombre:', nombre); // 👈
    const user = await this.getUserData();
    if (user) {
      await updateProfile(user, { displayName: nombre });
    }
  }
  enviarEmailRecuperacion(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
}

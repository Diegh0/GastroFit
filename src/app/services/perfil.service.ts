import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  Firestore,
  doc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  docData,
  getDoc,
  setDoc
} from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) {}

  // Obtener datos del perfil
  async getPerfil() {
    const uid = await this.authService.getUserIdAsync();
    const ref = doc(this.firestore, `users/${uid}`);
    const snapshot = await getDoc(ref);
  
    // Si no existe, lo creamos con peso/altura nulos
    if (!snapshot.exists()) {
      await setDoc(ref, {
        peso: null,
        altura: null
      }, { merge: true });
    }
  
    return firstValueFrom(docData(ref));
  }
  

  // Actualizar peso y altura + registrar en historial de pesos
  async actualizarPerfil(data: { nombre: string; peso: number; altura: number }) {
    const uid = await this.authService.getUserIdAsync();
    const ref = doc(this.firestore, `users/${uid}`);
    await setDoc(ref, {
      nombre: data.nombre,
      peso: data.peso,
      altura: data.altura
    }, { merge: true });
    
  
    const pesoRef = collection(this.firestore, `users/${uid}/pesos`);
    await addDoc(pesoRef, {
      valor: data.peso,
      fecha: serverTimestamp()
    });
  }
  async insertarPesoManual(valor: number, fecha: Date) {
    const uid = await this.authService.getUserIdAsync();
    const pesoRef = collection(this.firestore, `users/${uid}/pesos`);
    await addDoc(pesoRef, {
      valor,
      fecha
    });
  }
  
}

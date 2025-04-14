// src/app/core/services/planificacion.service.ts
import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc, collection, getDocs, deleteDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { PlanificacionSemanal } from '../models/comida.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlanificacionService {
  constructor(private firestore: Firestore, private auth: AuthService) {}
  
  guardarPlanificacion(userId: string, semana: string, planificacion: any): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${userId}/planificacion/${semana}`);
    return setDoc(ref, planificacion);
  }
  async getPlanificacion(fechaSemana: string): Promise<PlanificacionSemanal | null> {
    const uid = await this.auth.getUserId();
    const ref = doc(this.firestore, `usuarios/${uid}/planificacion/${fechaSemana}`);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as PlanificacionSemanal) : null;
  }

  async setPlanificacion(fechaSemana: string, data: PlanificacionSemanal): Promise<void> {
    const uid = await this.auth.getUserId();
    const ref = doc(this.firestore, `usuarios/${uid}/planificacion/${fechaSemana}`);
    await setDoc(ref, data);
  }

  async getSemanasGuardadas(): Promise<string[]> {
    const uid = await this.auth.getUserId();
    const ref = collection(this.firestore, `usuarios/${uid}/planificacion`);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => doc.id).sort();
  }
  async eliminarPlanificacion(fechaSemana: string): Promise<void> {
    const user = await firstValueFrom(this.auth.user$);
    if (!user) throw new Error('No hay usuario autenticado');
  
    const planificacionesRef = collection(this.firestore, `usuarios/${user.uid}/planificacion`);
    const planificacionDoc = doc(planificacionesRef, fechaSemana);
    await deleteDoc(planificacionDoc);
  }
  
}

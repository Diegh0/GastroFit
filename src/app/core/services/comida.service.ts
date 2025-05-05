import { Injectable } from '@angular/core';
import { Comida } from '../models/comida.model';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collectionData,
  getDoc,
} from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import { firstValueFrom, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComidaService {
  private comidas: Comida[] = [];

  constructor(private firestore: Firestore, private auth: AuthService) {}

  async setComidas(data: Comida[]): Promise<void> {
    const userId = await this.auth.getUserIdAsync();
    if (!userId) return;

    const ref = collection(this.firestore, `users/${userId}/comidas`);

    const snapshot = await getDocs(ref);
    const deletions = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletions);

    await Promise.all(
      data.map((c) =>
        setDoc(doc(this.firestore, `users/${userId}/comidas/${c.id}`), c)
      )
    );
  }

  getComidasObservable(): Observable<Comida[]> {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        const ref = collection(this.firestore, `users/${user.uid}/comidas`);
        return collectionData(ref, { idField: 'id' }) as Observable<Comida[]>;
      })
    );
  }

  async getComidas(): Promise<Comida[]> {
    const userId = await this.auth.getUserIdAsync();
    if (!userId) return [];

    const ref = collection(this.firestore, `users/${userId}/comidas`);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((doc) => doc.data() as Comida);
  }

  // comida.service.ts
async getComidaPorId(id: string): Promise<Comida | undefined> {
  const user = await firstValueFrom(this.auth.user$);
  if (!user) return undefined;

  const docRef = doc(this.firestore, `users/${user.uid}/comidas/${id}`);
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as Comida) : undefined;
}

  
}

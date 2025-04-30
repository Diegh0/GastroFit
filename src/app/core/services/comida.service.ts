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
} from '@angular/fire/firestore';
import { v4 as uuid } from 'uuid';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  private comidas: Comida[] = [];

  constructor(private firestore: Firestore, private auth: AuthService) {}

  async setComidas(data: Comida[]): Promise<void> {
    const user = await firstValueFrom(this.auth.user$); // ✅ dentro del método, correcto
    if (!user) return;

    const ref = collection(this.firestore, `users/${user.uid}/comidas`);
    this.comidas = data;

    // Borrar comidas anteriores
    const snapshot = await getDocs(ref);
    const deletions = snapshot.docs.map((docSnap) =>
      deleteDoc(docSnap.ref)
    );
    await Promise.all(deletions);

    // Guardar nuevas comidas
    await Promise.all(
      data.map((c) =>
        setDoc(
          doc(this.firestore, `users/${user.uid}/comidas/${c.id}`),
          c
        )
      )
    );
  }
  getComidasObservable(): Observable<Comida[]> {
    return this.auth.user$.pipe(
      switchMap(user => {
        if (!user) return of([]);
        const ref = collection(this.firestore, `users/${user.uid}/comidas`);
        return collectionData(ref, { idField: 'id' }) as Observable<Comida[]>;
      })
    );
  }
  async getComidas(): Promise<Comida[]> {
    if (this.comidas.length) return this.comidas;

    const user = await firstValueFrom(this.auth.user$);
    if (!user) return [];

    const ref = collection(this.firestore, `users/${user.uid}/comidas`);
    const snapshot = await getDocs(ref);
    this.comidas = snapshot.docs.map((doc) => doc.data() as Comida);

    return this.comidas;
  }

  getComidaPorId(id: string): Comida | undefined {
    return this.comidas.find((c) => c.id === id);
  }
}

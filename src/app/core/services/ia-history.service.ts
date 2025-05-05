import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  CollectionReference,
  where,
  deleteDoc,
  doc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HistoryEntry, HistoryEntryIA } from '../models/history-entry';

@Injectable({ providedIn: 'root' })
export class IaHistoryService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  private async getUserId(): Promise<string> {
    const user = await firstValueFrom(this.authService.user$);
    if (!user) throw new Error('Usuario no autenticado');
    return user.uid;
  }

  private async iaHistoryRef(): Promise<CollectionReference> {
    const userId = await this.getUserId();
    return collection(this.firestore, `users/${userId}/iaHistory`) as CollectionReference;
  }

  private async historyRef(): Promise<CollectionReference> {
    const userId = await this.getUserId();
    return collection(this.firestore, `users/${userId}/history`) as CollectionReference;
  }

  async addIaEntry(entry: Omit<HistoryEntryIA, 'fechaGeneracion'>): Promise<void> {
    const ref = await this.iaHistoryRef();
    await addDoc(ref, {
      ...entry,
      fechaGeneracion: serverTimestamp(),
      migrado: false
    });
  }

  async getIaHistory(): Promise<Observable<HistoryEntryIA[]>> {
    const ref = await this.iaHistoryRef();
    const q = query(ref, orderBy('fechaGeneracion', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<HistoryEntryIA[]>;
  }

  async migrateToMainHistory() {
    const iaRef = await this.iaHistoryRef();
    const mainRef = await this.historyRef();

    const iaSnap = await getDocs(query(iaRef, where('migrado', '==', false)));
    const iaDocs = iaSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as HistoryEntryIA));

    const historySnap = await getDocs(mainRef);
    const existing = new Set(
      historySnap.docs.map(doc => {
        const d = doc.data() as HistoryEntry;
        return `${d.recipeId}-${d.dia}-${d.tipo}`;
      })
    );

    for (const docIa of iaDocs) {
      const key = `${docIa.recipeId}-${docIa.dia}-${docIa.tipo}`;
      if (!existing.has(key)) {
        await addDoc(mainRef, {
          dia: docIa.dia,
          tipo: docIa.tipo,
          recipeId: docIa.recipeId,
          nombre: docIa.nombre,
          fechaGeneracion: docIa.fechaGeneracion,
          source: 'ia'
        });
        await deleteDoc(doc(iaRef, docIa.id!));
      }
    }
  }

  async deleteByRecipeId(recipeId: string): Promise<void> {
    const ref = await this.iaHistoryRef();
    const snap = await getDocs(query(ref, where('recipeId', '==', recipeId)));
    for (const docSnap of snap.docs) {
      await deleteDoc(docSnap.ref);
    }
  }
}

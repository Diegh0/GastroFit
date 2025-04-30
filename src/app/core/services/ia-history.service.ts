// services/ia-history.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore, collection, addDoc, serverTimestamp,
  query, orderBy, getDocs, CollectionReference, where, deleteDoc, doc
} from '@angular/fire/firestore';
import { HistoryEntry, HistoryEntryIA } from '../models/history-entry';
import { collectionData } from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IaHistoryService {
  private userId = 'usuario-ejemplo'; // luego lo sacas dinámicamente del auth
  constructor(private firestore: Firestore) {}

  private iaHistoryRef(): CollectionReference {
    return collection(this.firestore, `users/${this.userId}/iaHistory`) as CollectionReference;
  }

  private historyRef(): CollectionReference {
    return collection(this.firestore, `users/${this.userId}/history`) as CollectionReference;
  }
  
 

  async addIaEntry(entry: Omit<HistoryEntryIA, 'fechaGeneracion'>): Promise<void> {
    await addDoc(this.iaHistoryRef(), {
      ...entry,
      fechaGeneracion: serverTimestamp(),
      migrado: false
    });
  }

  getIaHistory(): Observable<HistoryEntryIA[]> {
    const q = query(this.iaHistoryRef(), orderBy('fechaGeneracion', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<HistoryEntryIA[]>;
  }
  

  async migrateToMainHistory() {
    const iaSnap = await getDocs(query(this.iaHistoryRef(), where('migrado', '==', false)));
    const iaDocs = iaSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as HistoryEntryIA));

    const historySnap = await getDocs(this.historyRef());
    const existing = new Set(
      historySnap.docs.map(doc => {
        const d = doc.data() as HistoryEntry;
        return `${d.recipeId}-${d.dia}-${d.tipo}`;
      })
    );

    for (const docIa of iaDocs) {
      const key = `${docIa.recipeId}-${docIa.dia}-${docIa.tipo}`;
      if (!existing.has(key)) {
        await addDoc(this.historyRef(), {
          dia: docIa.dia,
          tipo: docIa.tipo,
          recipeId: docIa.recipeId,
          nombre: docIa.nombre,
          fechaGeneracion: docIa.fechaGeneracion,
          source: 'ia'
        });
        // Marcar como migrado
        await deleteDoc(doc(this.iaHistoryRef(), docIa.id!));
      }
    }
  }
  async deleteByRecipeId(recipeId: string): Promise<void> {
    const ref = query(this.iaHistoryRef(), where('recipeId', '==', recipeId));
    const snap = await getDocs(ref);
    for (const docSnap of snap.docs) {
      await deleteDoc(docSnap.ref);
    }
  }
  
}

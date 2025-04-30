import {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
  } from '@angular/fire/firestore';
  import { Comida } from '../models/comida.model';
  
  export const comidaConverter: FirestoreDataConverter<Comida> = {
    toFirestore({ id, ...data }: Comida) {
      return data;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Comida {
      const data = snapshot.data(options)!;
      return { id: snapshot.id, ...data } as Comida;
    }
  };
  
// src/app/core/utils/recipe-converter.ts
import {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
  } from '@angular/fire/firestore';
  import { Recipe } from '../models/comida.model'; // ajusta la ruta si tu modelo está en otro sitio
  
  export const recipeConverter: FirestoreDataConverter<Recipe> = {
    toFirestore(recipe: Recipe) {
      // Al guardar, ignoramos la propiedad `id`
      const { id, ...data } = recipe;
      return data;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Recipe {
      const data = snapshot.data(options)!;
      return { id: snapshot.id, ...data } as Recipe;
    }
  };
  
// scripts/seed-recipes.ts

// Usamos CommonJS para evitar errores de import en ejecución
// @ts-ignore
const admin = require('firebase-admin');
// @ts-ignore
const serviceAccount: any = require('./gastrofit-app-firebase-adminsdk-fbsvc-8f2c22bd42.json');

// Inicializamos con credenciales explícitas
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'gastrofit-app',
});

interface Recipe {
  nombre: string;
  tipoComida: 'Desayuno'|'Comida'|'Almuerzo'|'Merienda'|'Cena';
  caloriasTotales: number;
  proteinasTotales: number;
  grasasTotales: number;
  carbosTotales: number;
  restricciones: string[];
  ingredientes: Array<{
    nombre: string;
    gramos: number;
    caloriasPor100g: number;
    grasasPor100g: number;
    hidratosPor100g: number;
    proteinasPor100g: number;
  }>;
}

const recipes: Recipe[] = [
  ////////////////////////////////////////////////DESAYUNOS///////////////////////////////////////////////////////
  {
    nombre: 'Tostada de aguacate y huevo pochado con naranja',
    tipoComida: 'Desayuno',
    caloriasTotales: 497,
    proteinasTotales: 17.8,
    grasasTotales: 22.6,
    carbosTotales: 60.3,
    restricciones: ['sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Pan integral', gramos: 80, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Huevo entero', gramos: 60, caloriasPor100g: 155, grasasPor100g: 11, hidratosPor100g: 1.1, proteinasPor100g: 13 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Tomate cherry', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Naranja', gramos: 150, caloriasPor100g: 47, grasasPor100g: 0.1, hidratosPor100g: 12, proteinasPor100g: 0.9 }
    ]
  },
  {
    nombre: 'Yogur griego con granola sin frutos secos y semillas de chía',
    tipoComida: 'Desayuno',
    caloriasTotales: 498,
    proteinasTotales: 26.8,
    grasasTotales: 17.8,
    carbosTotales: 52.5,
    restricciones: ['sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Yogur griego natural', gramos: 200, caloriasPor100g: 97, grasasPor100g: 4, hidratosPor100g: 3.6, proteinasPor100g: 10 },
      { nombre: 'Granola sin frutos secos', gramos: 40, caloriasPor100g: 450, grasasPor100g: 12, hidratosPor100g: 70, proteinasPor100g: 8 },
      { nombre: 'Frutos rojos', gramos: 100, caloriasPor100g: 50, grasasPor100g: 0.3, hidratosPor100g: 11, proteinasPor100g: 1 },
      { nombre: 'Semillas de chía', gramos: 15, caloriasPor100g: 486, grasasPor100g: 31, hidratosPor100g: 42, proteinasPor100g: 17 }
    ]
  },
  {
    nombre: 'Batido vegano de avena, plátano y proteína',
    tipoComida: 'Desayuno',
    caloriasTotales: 540,
    proteinasTotales: 33.5,
    grasasTotales: 12.8,
    carbosTotales: 74.0,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Leche de avena', gramos: 250, caloriasPor100g: 47, grasasPor100g: 1.25, hidratosPor100g: 8.3, proteinasPor100g: 1 },
      { nombre: 'Plátano', gramos: 100, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 },
      { nombre: 'Espinacas', gramos: 50, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Avena integral', gramos: 40, caloriasPor100g: 372, grasasPor100g: 7, hidratosPor100g: 60, proteinasPor100g: 13 },
      { nombre: 'Proteína vegana en polvo', gramos: 30, caloriasPor100g: 400, grasasPor100g: 7, hidratosPor100g: 8, proteinasPor100g: 67 },
      { nombre: 'Semillas de lino', gramos: 10, caloriasPor100g: 534, grasasPor100g: 42, hidratosPor100g: 28.9, proteinasPor100g: 18.3 }
    ]
  },
  {
    nombre: 'Panqueques de avena y claras con miel y fresas',
    tipoComida: 'Desayuno',
    caloriasTotales: 501,
    proteinasTotales: 22.7,
    grasasTotales: 11.3,
    carbosTotales: 76.1,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Avena sin gluten', gramos: 80, caloriasPor100g: 372, grasasPor100g: 7, hidratosPor100g: 60, proteinasPor100g: 13 },
      { nombre: 'Claras de huevo', gramos: 100, caloriasPor100g: 52, grasasPor100g: 0.2, hidratosPor100g: 0.7, proteinasPor100g: 11 },
      { nombre: 'Plátano', gramos: 50, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 },
      { nombre: 'Miel', gramos: 10, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 },
      { nombre: 'Fresas', gramos: 100, caloriasPor100g: 32, grasasPor100g: 0.3, hidratosPor100g: 7.7, proteinasPor100g: 0.7 },
      { nombre: 'Aceite de coco', gramos: 5, caloriasPor100g: 892, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Tortilla de claras con espinacas y champiñones',
    tipoComida: 'Desayuno',
    caloriasTotales: 340,
    proteinasTotales: 24.9,
    grasasTotales: 7.8,
    carbosTotales: 44.5,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Claras de huevo', gramos: 150, caloriasPor100g: 52, grasasPor100g: 0.2, hidratosPor100g: 0.7, proteinasPor100g: 11 },
      { nombre: 'Espinacas frescas', gramos: 50, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Champiñones', gramos: 50, caloriasPor100g: 22, grasasPor100g: 0.3, hidratosPor100g: 3.3, proteinasPor100g: 3.1 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Pan integral', gramos: 50, caloriasPor100g: 250, grasasPor100g: 2, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Naranja', gramos: 150, caloriasPor100g: 47, grasasPor100g: 0.1, hidratosPor100g: 12, proteinasPor100g: 0.9 }
    ]
  },
  {
    nombre: 'Avena con leche desnatada, plátano y semillas de chía',
    tipoComida: 'Desayuno',
    caloriasTotales: 392,
    proteinasTotales: 16.1,
    grasasTotales: 8.4,
    carbosTotales: 66.8,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Avena integral', gramos: 50, caloriasPor100g: 372, grasasPor100g: 7, hidratosPor100g: 60, proteinasPor100g: 13 },
      { nombre: 'Leche desnatada', gramos: 200, caloriasPor100g: 34, grasasPor100g: 0.2, hidratosPor100g: 4.8, proteinasPor100g: 3.4 },
      { nombre: 'Plátano', gramos: 100, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 },
      { nombre: 'Semillas de chía', gramos: 10, caloriasPor100g: 486, grasasPor100g: 31, hidratosPor100g: 42, proteinasPor100g: 17 }
    ]
  },
  {
    nombre: 'Yogur griego 0% con frutos rojos, granola sin frutos secos y pan',
    tipoComida: 'Desayuno',
    caloriasTotales: 374,
    proteinasTotales: 22.0,
    grasasTotales: 5.5,
    carbosTotales: 55.0,
    restricciones: ['sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Yogur griego 0%', gramos: 150, caloriasPor100g: 59, grasasPor100g: 0, hidratosPor100g: 3.6, proteinasPor100g: 10 },
      { nombre: 'Frutos rojos', gramos: 100, caloriasPor100g: 50, grasasPor100g: 0.3, hidratosPor100g: 11, proteinasPor100g: 1 },
      { nombre: 'Granola sin frutos secos', gramos: 30, caloriasPor100g: 450, grasasPor100g: 12, hidratosPor100g: 70, proteinasPor100g: 8 },
      { nombre: 'Pan integral', gramos: 40, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 }
    ]
  },
  {
    nombre: 'Batido vegano de leche de almendra, avena, plátano y proteína',
    tipoComida: 'Desayuno',
    caloriasTotales: 393,
    proteinasTotales: 24.1,
    grasasTotales: 10.2,
    carbosTotales: 51.5,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Leche de almendra', gramos: 200, caloriasPor100g: 13, grasasPor100g: 1.1, hidratosPor100g: 0.3, proteinasPor100g: 0.4 },
      { nombre: 'Proteína vegana en polvo', gramos: 25, caloriasPor100g: 400, grasasPor100g: 7, hidratosPor100g: 8, proteinasPor100g: 67 },
      { nombre: 'Avena integral', gramos: 15, caloriasPor100g: 372, grasasPor100g: 7, hidratosPor100g: 60, proteinasPor100g: 13 },
      { nombre: 'Plátano', gramos: 50, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 },
      { nombre: 'Semillas de lino', gramos: 10, caloriasPor100g: 534, grasasPor100g: 42, hidratosPor100g: 28.9, proteinasPor100g: 18.3 },
      { nombre: 'Frutos rojos', gramos: 100, caloriasPor100g: 50, grasasPor100g: 0.3, hidratosPor100g: 11, proteinasPor100g: 1 }
    ]
  },
  {
    nombre: 'Bowl de avena energizante',
    tipoComida: 'Desayuno',
    caloriasTotales: 639,
    proteinasTotales: 24.4,
    grasasTotales: 19.8,
    carbosTotales: 94.2,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Avena integral', gramos: 80, caloriasPor100g: 372, grasasPor100g: 7, hidratosPor100g: 60, proteinasPor100g: 13 },
      { nombre: 'Leche semidesnatada', gramos: 200, caloriasPor100g: 45, grasasPor100g: 1.5, hidratosPor100g: 5, proteinasPor100g: 3.4 },
      { nombre: 'Plátano', gramos: 100, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 },
      { nombre: 'Mantequilla de cacahuete', gramos: 15, caloriasPor100g: 588, grasasPor100g: 50, hidratosPor100g: 20, proteinasPor100g: 25 },
      { nombre: 'Semillas de chía', gramos: 10, caloriasPor100g: 486, grasasPor100g: 31, hidratosPor100g: 42, proteinasPor100g: 17 },
      { nombre: 'Frambuesas', gramos: 50, caloriasPor100g: 52, grasasPor100g: 0.7, hidratosPor100g: 12, proteinasPor100g: 1.2 }
    ]
  },
  {
    nombre: 'Tostada de pan integral con aguacate, huevo y salmón',
    tipoComida: 'Desayuno',
    caloriasTotales: 672,
    proteinasTotales: 28.6,
    grasasTotales: 33.3,
    carbosTotales: 69.0,
    restricciones: ['sin lactosa'],
    ingredientes: [
      { nombre: 'Pan integral', gramos: 100, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Aguacate', gramos: 70, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Huevo entero', gramos: 60, caloriasPor100g: 155, grasasPor100g: 11, hidratosPor100g: 1.1, proteinasPor100g: 13 },
      { nombre: 'Salmón ahumado', gramos: 50, caloriasPor100g: 117, grasasPor100g: 4, hidratosPor100g: 0, proteinasPor100g: 18 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Naranja', gramos: 150, caloriasPor100g: 47, grasasPor100g: 0.1, hidratosPor100g: 12, proteinasPor100g: 0.9 }
    ]
  },
  {
    nombre: 'Bagel integral con queso crema, huevo y frutos rojos',
    tipoComida: 'Desayuno',
    caloriasTotales: 650,
    proteinasTotales: 23.0,
    grasasTotales: 20.0,
    carbosTotales: 85.0,
    restricciones: ['sin lactosa'],
    ingredientes: [
      { nombre: 'Bagel integral', gramos: 100, caloriasPor100g: 250, grasasPor100g: 2, hidratosPor100g: 48, proteinasPor100g: 10 },
      { nombre: 'Queso crema', gramos: 40, caloriasPor100g: 250, grasasPor100g: 25, hidratosPor100g: 4, proteinasPor100g: 6 },
      { nombre: 'Huevo entero', gramos: 60, caloriasPor100g: 155, grasasPor100g: 11, hidratosPor100g: 1.1, proteinasPor100g: 13 },
      { nombre: 'Frutos rojos', gramos: 100, caloriasPor100g: 50, grasasPor100g: 0.3, hidratosPor100g: 11, proteinasPor100g: 1 }
    ]
  },
  {
    nombre: 'Panqueques integrales con miel y nueces',
    tipoComida: 'Desayuno',
    caloriasTotales: 640,
    proteinasTotales: 17.0,
    grasasTotales: 18.0,
    carbosTotales: 95.0,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Harina integral', gramos: 70, caloriasPor100g: 340, grasasPor100g: 2.5, hidratosPor100g: 70, proteinasPor100g: 12 },
      { nombre: 'Clara de huevo', gramos: 100, caloriasPor100g: 52, grasasPor100g: 0.2, hidratosPor100g: 0.7, proteinasPor100g: 11 },
      { nombre: 'Leche semidesnatada', gramos: 100, caloriasPor100g: 45, grasasPor100g: 1.5, hidratosPor100g: 5, proteinasPor100g: 3.4 },
      { nombre: 'Miel', gramos: 10, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 },
      { nombre: 'Nueces', gramos: 15, caloriasPor100g: 654, grasasPor100g: 65, hidratosPor100g: 14, proteinasPor100g: 15.2 },
      { nombre: 'Aceite de coco', gramos: 5, caloriasPor100g: 892, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Bocadillo integral de pechuga de pavo, aguacate y rúcula',
    tipoComida: 'Desayuno',
    caloriasTotales: 431,
    proteinasTotales: 21,
    grasasTotales: 14,
    carbosTotales: 62,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Pan integral', gramos: 120, caloriasPor100g: 246, grasasPor100g: 4.2, hidratosPor100g: 46.1, proteinasPor100g: 9.7 },
      { nombre: 'Aguacate', gramos: 60, caloriasPor100g: 160, grasasPor100g: 14.66, hidratosPor100g: 8.53, proteinasPor100g: 2 },
      { nombre: 'Rúcula', gramos: 30, caloriasPor100g: 25, grasasPor100g: 0.66, hidratosPor100g: 3.65, proteinasPor100g: 2.58 },
      { nombre: 'Pechuga de pavo en lonchas', gramos: 40, caloriasPor100g: 80, grasasPor100g: 0.8, hidratosPor100g: 1.3, proteinasPor100g: 18 },
    ]
  },
  ///////////////////////////////////////////COMIDA///////////////////////////////////////////////////////////7
  {
    nombre: 'Pechuga de pollo con quinoa, brócoli y ensalada de aguacate',
    tipoComida: 'Comida',
    caloriasTotales: 691,
    proteinasTotales: 58.1,
    grasasTotales: 31.4,
    carbosTotales: 46.4,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Pechuga de pollo', gramos: 150, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Quinoa cocida', gramos: 150, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Brócoli', gramos: 100, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 },
      { nombre: 'Lechuga', gramos: 50, caloriasPor100g: 15, grasasPor100g: 0.2, hidratosPor100g: 2.9, proteinasPor100g: 1.4 },
      { nombre: 'Tomate', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Aceite de oliva', gramos: 15, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Lentejas estofadas con tofu, arroz integral y ensalada de zanahoria',
    tipoComida: 'Comida',
    caloriasTotales: 720,
    proteinasTotales: 36.6,
    grasasTotales: 22.2,
    carbosTotales: 95.9,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Lentejas secas', gramos: 100, caloriasPor100g: 353, grasasPor100g: 1.1, hidratosPor100g: 60, proteinasPor100g: 25 },
      { nombre: 'Tofu', gramos: 100, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Arroz integral cocido', gramos: 100, caloriasPor100g: 111, grasasPor100g: 0.9, hidratosPor100g: 23, proteinasPor100g: 2.6 },
      { nombre: 'Zanahoria', gramos: 100, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Aceite de oliva', gramos: 15, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Limón', gramos: 10, caloriasPor100g: 29, grasasPor100g: 0.2, hidratosPor100g: 1, proteinasPor100g: 0.1 }
    ]
  },
  {
    nombre: 'Salmón al horno con patata asada, espárragos y arroz blanco',
    tipoComida: 'Comida',
    caloriasTotales: 730,
    proteinasTotales: 38.5,
    grasasTotales: 30.0,
    carbosTotales: 73.1,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Salmón', gramos: 150, caloriasPor100g: 208, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Patata cocida', gramos: 200, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Espárragos', gramos: 100, caloriasPor100g: 20, grasasPor100g: 0.12, hidratosPor100g: 3.9, proteinasPor100g: 2.2 },
      { nombre: 'Arroz blanco cocido', gramos: 100, caloriasPor100g: 130, grasasPor100g: 0.2, hidratosPor100g: 28, proteinasPor100g: 2.4 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Limón', gramos: 10, caloriasPor100g: 29, grasasPor100g: 0.2, hidratosPor100g: 1, proteinasPor100g: 0.1 }
    ]
  },
  {
    nombre: 'Ensalada de garbanzos con atún, aceitunas y pan integral',
    tipoComida: 'Comida',
    caloriasTotales: 720,
    proteinasTotales: 47.6,
    grasasTotales: 21.4,
    carbosTotales: 84.4,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Garbanzos cocidos', gramos: 150, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Atún en agua', gramos: 100, caloriasPor100g: 116, grasasPor100g: 0.8, hidratosPor100g: 0, proteinasPor100g: 26 },
      { nombre: 'Aceitunas negras', gramos: 30, caloriasPor100g: 115, grasasPor100g: 10.9, hidratosPor100g: 6.3, proteinasPor100g: 0.8 },
      { nombre: 'Pan integral', gramos: 80, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Pimiento rojo', gramos: 50, caloriasPor100g: 31, grasasPor100g: 0.3, hidratosPor100g: 6, proteinasPor100g: 1 },
      { nombre: 'Cebolla roja', gramos: 30, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Pechuga de pollo con quinoa, brócoli y aguacate',
    tipoComida: 'Comida',
    caloriasTotales: 597,
    proteinasTotales: 48.8,
    grasasTotales: 25.1,
    carbosTotales: 46.4,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Pechuga de pollo', gramos: 120, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Quinoa cocida', gramos: 150, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Brócoli', gramos: 100, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Lechuga', gramos: 50, caloriasPor100g: 15, grasasPor100g: 0.2, hidratosPor100g: 2.9, proteinasPor100g: 1.4 },
      { nombre: 'Tomate', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 }
    ]
  },
  {
    nombre: 'Lentejas estofadas con tofu y arroz integral',
    tipoComida: 'Comida',
    caloriasTotales: 600,
    proteinasTotales: 30.0,
    grasasTotales: 22.0,
    carbosTotales: 65.0,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Lentejas cocidas', gramos: 150, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Tofu', gramos: 100, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Arroz integral cocido', gramos: 100, caloriasPor100g: 111, grasasPor100g: 0.9, hidratosPor100g: 23, proteinasPor100g: 2.6 },
      { nombre: 'Zanahoria', gramos: 100, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Limón', gramos: 10, caloriasPor100g: 29, grasasPor100g: 0.2, hidratosPor100g: 1, proteinasPor100g: 0.1 },
      { nombre: 'Aceitunas negras', gramos: 20, caloriasPor100g: 115, grasasPor100g: 10.9, hidratosPor100g: 6.3, proteinasPor100g: 0.8 }
    ]
  },
  {
    nombre: 'Salmón al horno con patata asada, espárragos y arroz blanco',
    tipoComida: 'Comida',
    caloriasTotales: 650,
    proteinasTotales: 37.0,
    grasasTotales: 30.0,
    carbosTotales: 56.0,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Salmón', gramos: 150, caloriasPor100g: 208, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Patata cocida', gramos: 150, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Espárragos', gramos: 100, caloriasPor100g: 20, grasasPor100g: 0.12, hidratosPor100g: 3.9, proteinasPor100g: 2.2 },
      { nombre: 'Arroz blanco cocido', gramos: 80, caloriasPor100g: 130, grasasPor100g: 0.2, hidratosPor100g: 28, proteinasPor100g: 2.4 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Ensalada de garbanzos con atún, aceitunas y pan integral',
    tipoComida: 'Comida',
    caloriasTotales: 600,
    proteinasTotales: 43.0,
    grasasTotales: 20.3,
    carbosTotales: 62.0,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Garbanzos cocidos', gramos: 120, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Atún en agua', gramos: 100, caloriasPor100g: 116, grasasPor100g: 0.8, hidratosPor100g: 0, proteinasPor100g: 26 },
      { nombre: 'Aceitunas negras', gramos: 20, caloriasPor100g: 115, grasasPor100g: 10.9, hidratosPor100g: 6.3, proteinasPor100g: 0.8 },
      { nombre: 'Pan integral', gramos: 50, caloriasPor100g: 250, grasasPor100g: 2, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Pimiento rojo', gramos: 50, caloriasPor100g: 31, grasasPor100g: 0.3, hidratosPor100g: 6, proteinasPor100g: 1 },
      { nombre: 'Cebolla roja', gramos: 30, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Lomo de cerdo a la plancha con arroz integral y verduras salteadas',
    tipoComida: 'Comida',
    caloriasTotales: 810,
    proteinasTotales: 60.0,
    grasasTotales: 28.0,
    carbosTotales: 85.0,
    restricciones: ['sin lactosa'],
    ingredientes: [
      { nombre: 'Lomo de cerdo', gramos: 150, caloriasPor100g: 172, grasasPor100g: 10, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Arroz integral cocido', gramos: 150, caloriasPor100g: 111, grasasPor100g: 0.9, hidratosPor100g: 23, proteinasPor100g: 2.6 },
      { nombre: 'Brócoli', gramos: 100, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 },
      { nombre: 'Pimiento rojo', gramos: 50, caloriasPor100g: 31, grasasPor100g: 0.3, hidratosPor100g: 6, proteinasPor100g: 1 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Ensalada de pasta integral con atún, garbanzos y aguacate',
    tipoComida: 'Comida',
    caloriasTotales: 780,
    proteinasTotales: 45.0,
    grasasTotales: 24.0,
    carbosTotales: 90.0,
    restricciones: ['sin lactosa'],
    ingredientes: [
      { nombre: 'Pasta integral cocida', gramos: 150, caloriasPor100g: 150, grasasPor100g: 1.5, hidratosPor100g: 30, proteinasPor100g: 6 },
      { nombre: 'Atún en agua', gramos: 100, caloriasPor100g: 116, grasasPor100g: 0.8, hidratosPor100g: 0, proteinasPor100g: 26 },
      { nombre: 'Garbanzos cocidos', gramos: 100, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Curry de pollo y patata con arroz basmati',
    tipoComida: 'Comida',
    caloriasTotales: 820,
    proteinasTotales: 50.0,
    grasasTotales: 34.0,
    carbosTotales: 88.0,
    restricciones: ['sin gluten'],
    ingredientes: [
      { nombre: 'Pechuga de pollo', gramos: 150, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Patata', gramos: 200, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Curry en polvo', gramos: 10, caloriasPor100g: 325, grasasPor100g: 14, hidratosPor100g: 58, proteinasPor100g: 12 },
      { nombre: 'Arroz basmati cocido', gramos: 150, caloriasPor100g: 130, grasasPor100g: 0.3, hidratosPor100g: 28, proteinasPor100g: 2.4 },
      { nombre: 'Leche de coco', gramos: 50, caloriasPor100g: 230, grasasPor100g: 24, hidratosPor100g: 3, proteinasPor100g: 2 }
    ]
  },
  {
    nombre: 'Bowl vegano de tofu con quinoa, hummus y vegetales asados',
    tipoComida: 'Comida',
    caloriasTotales: 770,
    proteinasTotales: 30.0,
    grasasTotales: 26.0,
    carbosTotales: 100.0,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Tofu firme', gramos: 100, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Hummus', gramos: 50, caloriasPor100g: 166, grasasPor100g: 9.6, hidratosPor100g: 14.3, proteinasPor100g: 7.9 },
      { nombre: 'Calabacín asado', gramos: 100, caloriasPor100g: 17, grasasPor100g: 0.3, hidratosPor100g: 3.1, proteinasPor100g: 1.2 },
      { nombre: 'Pimiento rojo asado', gramos: 50, caloriasPor100g: 31, grasasPor100g: 0.3, hidratosPor100g: 6, proteinasPor100g: 1 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Filete de ternera a la plancha con patata asada y verduras',
    tipoComida: 'Comida',
    caloriasTotales: 965,
    proteinasTotales: 68,
    grasasTotales: 36,
    carbosTotales: 100,
    restricciones: ['sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Ternera magra', gramos: 200, caloriasPor100g: 217, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 26 },
      { nombre: 'Patata asada', gramos: 250, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Pan integral', gramos: 80, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Brócoli', gramos: 100, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 },
      { nombre: 'Zanahoria', gramos: 50, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Pimiento rojo', gramos: 50, caloriasPor100g: 31, grasasPor100g: 0.3, hidratosPor100g: 6, proteinasPor100g: 1 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Lasaña integral de pollo y verduras',
    tipoComida: 'Comida',
    caloriasTotales: 970,
    proteinasTotales: 73,
    grasasTotales: 42,
    carbosTotales: 117,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Láminas de lasaña integral', gramos: 150, caloriasPor100g: 350, grasasPor100g: 3.5, hidratosPor100g: 68, proteinasPor100g: 10 },
      { nombre: 'Pollo picado', gramos: 100, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Queso mozzarella', gramos: 50, caloriasPor100g: 280, grasasPor100g: 22, hidratosPor100g: 3, proteinasPor100g: 22 },
      { nombre: 'Tomate triturado', gramos: 100, caloriasPor100g: 29, grasasPor100g: 0.4, hidratosPor100g: 5.5, proteinasPor100g: 1.5 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Champiñones', gramos: 50, caloriasPor100g: 22, grasasPor100g: 0.3, hidratosPor100g: 3.3, proteinasPor100g: 3.1 },
      { nombre: 'Espinacas', gramos: 50, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 }
    ]
  },
  {
    nombre: 'Curry vegano de garbanzos con arroz basmati',
    tipoComida: 'Comida',
    caloriasTotales: 968,
    proteinasTotales: 27,
    grasasTotales: 40,
    carbosTotales: 125,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Garbanzos cocidos', gramos: 200, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Arroz basmati cocido', gramos: 200, caloriasPor100g: 130, grasasPor100g: 0.3, hidratosPor100g: 28, proteinasPor100g: 2.4 },
      { nombre: 'Leche de coco', gramos: 100, caloriasPor100g: 230, grasasPor100g: 24, hidratosPor100g: 3, proteinasPor100g: 2 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Curry en polvo', gramos: 10, caloriasPor100g: 325, grasasPor100g: 14, hidratosPor100g: 58, proteinasPor100g: 12 },
      { nombre: 'Espinacas', gramos: 50, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Tomate', gramos: 100, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 }
    ]
  },
  {
    nombre: 'Ensalada de quinoa con atún y aguacate',
    tipoComida: 'Comida',
    caloriasTotales: 483,
    proteinasTotales: 37,
    grasasTotales: 17,
    carbosTotales: 50,
    restricciones: ['sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Quinoa cocida', gramos: 120, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Atún en agua', gramos: 100, caloriasPor100g: 116, grasasPor100g: 0.8, hidratosPor100g: 0, proteinasPor100g: 26 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Pepino', gramos: 100, caloriasPor100g: 16, grasasPor100g: 0.1, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Tomate cherry', gramos: 100, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Pan integral', gramos: 30, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Sopa de lentejas con verduras y pan integral',
    tipoComida: 'Comida',
    caloriasTotales: 453,
    proteinasTotales: 17,
    grasasTotales: 15,
    carbosTotales: 66,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Lentejas cocidas', gramos: 150, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Zanahoria', gramos: 100, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Apio', gramos: 50, caloriasPor100g: 16, grasasPor100g: 0.2, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Cebolla', gramos: 50, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Pan integral', gramos: 20, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 }
    ]
  },
  {
    nombre: 'Pechuga de pollo con batata, espárragos, arroz integral y espinacas',
    tipoComida: 'Comida',
    caloriasTotales: 502,
    proteinasTotales: 44.6,
    grasasTotales: 15.2,
    carbosTotales: 47.4,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Pechuga de pollo', gramos: 120, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Batata asada', gramos: 150, caloriasPor100g: 86, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.6 },
      { nombre: 'Espárragos', gramos: 100, caloriasPor100g: 20, grasasPor100g: 0.12, hidratosPor100g: 3.9, proteinasPor100g: 2.2 },
      { nombre: 'Arroz integral cocido', gramos: 50, caloriasPor100g: 111, grasasPor100g: 0.9, hidratosPor100g: 23, proteinasPor100g: 2.6 },
      { nombre: 'Espinacas frescas', gramos: 50, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Salmón al horno con quinoa, brócoli, patata asada y aceite de oliva',
    tipoComida: 'Comida',
    caloriasTotales: 641,
    proteinasTotales: 39.1,
    grasasTotales: 31.9,
    carbosTotales: 48.1,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Salmón', gramos: 150, caloriasPor100g: 208, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Brócoli', gramos: 100, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 },
      { nombre: 'Patata asada', gramos: 100, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Lentejas estofadas con tofu, arroz integral, zanahoria y calabacín',
    tipoComida: 'Comida',
    caloriasTotales: 615,
    proteinasTotales: 26.9,
    grasasTotales: 20.5,
    carbosTotales: 85.0,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Lentejas cocidas', gramos: 150, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Arroz integral cocido', gramos: 150, caloriasPor100g: 111, grasasPor100g: 0.9, hidratosPor100g: 23, proteinasPor100g: 2.6 },
      { nombre: 'Tofu firme', gramos: 100, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Zanahoria', gramos: 50, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Calabacín', gramos: 100, caloriasPor100g: 17, grasasPor100g: 0.3, hidratosPor100g: 3.1, proteinasPor100g: 1.2 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Tortilla de patata y cebolla con aceite de oliva',
    tipoComida: 'Comida',
    caloriasTotales: 606,
    proteinasTotales: 26.8,
    grasasTotales: 40.0,
    carbosTotales: 38.6,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Patata', gramos: 150, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Huevo entero', gramos: 180, caloriasPor100g: 155, grasasPor100g: 11, hidratosPor100g: 1.1, proteinasPor100g: 13 },
      { nombre: 'Cebolla', gramos: 50, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 20, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Ensalada de pasta integral con atún, huevo duro, aceitunas y pan integral',
    tipoComida: 'Comida',
    caloriasTotales: 584,
    proteinasTotales: 46.2,
    grasasTotales: 23.6,
    carbosTotales: 69.0,
    restricciones: ['sin lactosa'],
    ingredientes: [
      { nombre: 'Pasta integral cocida', gramos: 150, caloriasPor100g: 150, grasasPor100g: 1.5, hidratosPor100g: 30, proteinasPor100g: 6 },
      { nombre: 'Atún en agua', gramos: 100, caloriasPor100g: 116, grasasPor100g: 0.8, hidratosPor100g: 0, proteinasPor100g: 26 },
      { nombre: 'Huevo duro', gramos: 50, caloriasPor100g: 155, grasasPor100g: 11, hidratosPor100g: 1.1, proteinasPor100g: 13 },
      { nombre: 'Aceitunas negras', gramos: 30, caloriasPor100g: 115, grasasPor100g: 10.9, hidratosPor100g: 6.3, proteinasPor100g: 0.8 },
      { nombre: 'Pan integral', gramos: 40, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Curry de pollo con arroz basmati, leche de coco y especias',
    tipoComida: 'Comida',
    caloriasTotales: 678,
    proteinasTotales: 52.3,
    grasasTotales: 29.3,
    carbosTotales: 49.3,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Pechuga de pollo', gramos: 150, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Arroz basmati cocido', gramos: 150, caloriasPor100g: 130, grasasPor100g: 0.3, hidratosPor100g: 28, proteinasPor100g: 2.4 },
      { nombre: 'Leche de coco', gramos: 50, caloriasPor100g: 230, grasasPor100g: 24, hidratosPor100g: 3, proteinasPor100g: 2 },
      { nombre: 'Curry en polvo', gramos: 10, caloriasPor100g: 325, grasasPor100g: 14, hidratosPor100g: 58, proteinasPor100g: 12 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Bowl vegano de tofu, quinoa, hummus, calabacín, pimiento y semillas de girasol',
    tipoComida: 'Comida',
    caloriasTotales: 558,
    proteinasTotales: 23.8,
    grasasTotales: 28.7,
    carbosTotales: 55.8,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Tofu firme', gramos: 100, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Hummus', gramos: 50, caloriasPor100g: 166, grasasPor100g: 9.6, hidratosPor100g: 14.3, proteinasPor100g: 7.9 },
      { nombre: 'Calabacín asado', gramos: 100, caloriasPor100g: 17, grasasPor100g: 0.3, hidratosPor100g: 3.1, proteinasPor100g: 1.2 },
      { nombre: 'Pimiento rojo asado', gramos: 50, caloriasPor100g: 31, grasasPor100g: 0.3, hidratosPor100g: 6, proteinasPor100g: 1 },
      { nombre: 'Semillas de girasol', gramos: 10, caloriasPor100g: 584, grasasPor100g: 51, hidratosPor100g: 20, proteinasPor100g: 21 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Ensalada templada de salmón, arroz salvaje, espinacas, tomate cherry y pan integral',
    tipoComida: 'Comida',
    caloriasTotales: 544,
    proteinasTotales: 33.1,
    grasasTotales: 27.5,
    carbosTotales: 39.9,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Salmón', gramos: 120, caloriasPor100g: 208, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Arroz salvaje cocido', gramos: 100, caloriasPor100g: 101, grasasPor100g: 0.3, hidratosPor100g: 21, proteinasPor100g: 4 },
      { nombre: 'Espinacas frescas', gramos: 50, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Tomate cherry', gramos: 100, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Pan integral', gramos: 30, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Filete de ternera con patata rostizada, ensalada verde y pan integral',
    tipoComida: 'Comida',
    caloriasTotales: 661,
    proteinasTotales: 46.6,
    grasasTotales: 31.5,
    carbosTotales: 51.2,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Ternera magra', gramos: 150, caloriasPor100g: 217, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 26 },
      { nombre: 'Patata rostizada', gramos: 150, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Lechuga', gramos: 50, caloriasPor100g: 15, grasasPor100g: 0.2, hidratosPor100g: 2.9, proteinasPor100g: 1.4 },
      { nombre: 'Tomate', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Pan integral', gramos: 40, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Pasta integral con pollo, pesto de aguacate y tomate cherry',
    tipoComida: 'Comida',
    caloriasTotales: 501,
    proteinasTotales: 41.9,
    grasasTotales: 23.6,
    carbosTotales: 53.4,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Pasta integral cocida', gramos: 150, caloriasPor100g: 150, grasasPor100g: 1.5, hidratosPor100g: 30, proteinasPor100g: 6 },
      { nombre: 'Pechuga de pollo', gramos: 100, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Tomate cherry', gramos: 100, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 }
    ]
  },
  //////////////////////////////////MERIENDA//////////////////////////////////////////////////////////////
  {
    nombre: 'Yogur sin lactosa con almendras, miel y pan integral',
    tipoComida: 'Merienda',
    caloriasTotales: 318,
    proteinasTotales: 9.6,
    grasasTotales: 10.6,
    carbosTotales: 49.9,
    restricciones: ['sin lactosa'],
    ingredientes: [
      { nombre: 'Yogur natural sin lactosa', gramos: 125, caloriasPor100g: 61, grasasPor100g: 3.3, hidratosPor100g: 4.7, proteinasPor100g: 3.5 },
      { nombre: 'Almendras', gramos: 10, caloriasPor100g: 579, grasasPor100g: 49.9, hidratosPor100g: 21.6, proteinasPor100g: 21.2 },
      { nombre: 'Miel', gramos: 10, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 },
      { nombre: 'Pan integral', gramos: 30, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Manzana', gramos: 150, caloriasPor100g: 52, grasasPor100g: 0.2, hidratosPor100g: 14, proteinasPor100g: 0.3 }
    ]
  },
  {
    nombre: 'Hummus con palitos de zanahoria, pepino y crackers sin gluten',
    tipoComida: 'Merienda',
    caloriasTotales: 323,
    proteinasTotales: 11.1,
    grasasTotales: 13.9,
    carbosTotales: 37.9,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Hummus', gramos: 100, caloriasPor100g: 166, grasasPor100g: 9.6, hidratosPor100g: 14.3, proteinasPor100g: 7.9 },
      { nombre: 'Zanahoria', gramos: 100, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Pepino', gramos: 100, caloriasPor100g: 16, grasasPor100g: 0.1, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Crackers sin gluten', gramos: 20, caloriasPor100g: 500, grasasPor100g: 20, hidratosPor100g: 50, proteinasPor100g: 8 }
    ]
  },
  {
    nombre: 'Smoothie de fresas, mango y avena con yogur de soja',
    tipoComida: 'Merienda',
    caloriasTotales: 300,
    proteinasTotales: 9.7,
    grasasTotales: 6.1,
    carbosTotales: 54.5,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Fresas', gramos: 100, caloriasPor100g: 50, grasasPor100g: 0.3, hidratosPor100g: 11, proteinasPor100g: 1 },
      { nombre: 'Mango', gramos: 100, caloriasPor100g: 60, grasasPor100g: 0.4, hidratosPor100g: 15, proteinasPor100g: 0.8 },
      { nombre: 'Yogur de soja', gramos: 100, caloriasPor100g: 54, grasasPor100g: 1.8, hidratosPor100g: 6.9, proteinasPor100g: 3.8 },
      { nombre: 'Avena integral', gramos: 20, caloriasPor100g: 372, grasasPor100g: 7, hidratosPor100g: 60, proteinasPor100g: 13 },
      { nombre: 'Leche de avena', gramos: 100, caloriasPor100g: 47, grasasPor100g: 1.25, hidratosPor100g: 8.3, proteinasPor100g: 1 },
      { nombre: 'Semillas de chía', gramos: 3, caloriasPor100g: 486, grasasPor100g: 31, hidratosPor100g: 42, proteinasPor100g: 17 }
    ]
  },
  {
    nombre: 'Tostadas de centeno con queso fresco, tomate cherry y kiwi',
    tipoComida: 'Merienda',
    caloriasTotales: 306,
    proteinasTotales: 12.0,
    grasasTotales: 9.5,
    carbosTotales: 45.4,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Pan de centeno', gramos: 60, caloriasPor100g: 250, grasasPor100g: 2.5, hidratosPor100g: 49, proteinasPor100g: 8 },
      { nombre: 'Queso fresco', gramos: 50, caloriasPor100g: 96, grasasPor100g: 4.9, hidratosPor100g: 2.2, proteinasPor100g: 11 },
      { nombre: 'Tomate cherry', gramos: 100, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Kiwi', gramos: 75, caloriasPor100g: 61, grasasPor100g: 0.5, hidratosPor100g: 14.7, proteinasPor100g: 1.1 }
    ]
  },
  {
    nombre: 'Manzana, queso fresco y pan integral',
    tipoComida: 'Merienda',
    caloriasTotales: 200,
    proteinasTotales: 8.6,
    grasasTotales: 4.0,
    carbosTotales: 35.3,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Manzana', gramos: 150, caloriasPor100g: 52, grasasPor100g: 0.2, hidratosPor100g: 14, proteinasPor100g: 0.3 },
      { nombre: 'Queso fresco', gramos: 50, caloriasPor100g: 96, grasasPor100g: 4.9, hidratosPor100g: 2.2, proteinasPor100g: 11 },
      { nombre: 'Pan integral', gramos: 30, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 }
    ]
  },
  {
    nombre: 'Hummus con palitos de zanahoria, pepino y crackers sin gluten',
    tipoComida: 'Merienda',
    caloriasTotales: 215,
    proteinasTotales: 6.8,
    grasasTotales: 8.1,
    carbosTotales: 28.3,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Hummus', gramos: 50, caloriasPor100g: 166, grasasPor100g: 9.6, hidratosPor100g: 14.3, proteinasPor100g: 7.9 },
      { nombre: 'Zanahoria', gramos: 100, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Pepino', gramos: 100, caloriasPor100g: 16, grasasPor100g: 0.1, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Crackers sin gluten', gramos: 15, caloriasPor100g: 500, grasasPor100g: 20, hidratosPor100g: 50, proteinasPor100g: 8 }
    ]
  },
  {
    nombre: 'Yogur griego 0% con semillas de chía y miel',
    tipoComida: 'Merienda',
    caloriasTotales: 168,
    proteinasTotales: 16.7,
    grasasTotales: 3.1,
    carbosTotales: 17.8,
    restricciones: ['sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Yogur griego 0%', gramos: 150, caloriasPor100g: 59, grasasPor100g: 0, hidratosPor100g: 3.6, proteinasPor100g: 10 },
      { nombre: 'Semillas de chía', gramos: 10, caloriasPor100g: 486, grasasPor100g: 31, hidratosPor100g: 42, proteinasPor100g: 17 },
      { nombre: 'Miel', gramos: 10, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Batido de leche desnatada, plátano, avena y proteína',
    tipoComida: 'Merienda',
    caloriasTotales: 211,
    proteinasTotales: 17.7,
    grasasTotales: 2.6,
    carbosTotales: 28.0,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Leche desnatada', gramos: 150, caloriasPor100g: 34, grasasPor100g: 0.2, hidratosPor100g: 4.8, proteinasPor100g: 3.4 },
      { nombre: 'Plátano', gramos: 50, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 },
      { nombre: 'Avena integral', gramos: 15, caloriasPor100g: 372, grasasPor100g: 7, hidratosPor100g: 60, proteinasPor100g: 13 },
      { nombre: 'Proteína vegana en polvo', gramos: 15, caloriasPor100g: 400, grasasPor100g: 7, hidratosPor100g: 8, proteinasPor100g: 67 }
    ]
  },
  {
    nombre: 'Yogur griego sin lactosa con nueces y miel',
    tipoComida: 'Merienda',
    caloriasTotales: 350,
    proteinasTotales: 18.0,
    grasasTotales: 20.0,
    carbosTotales: 28.0,
    restricciones: ['sin lactosa'],
    ingredientes: [
      { nombre: 'Yogur griego sin lactosa', gramos: 150, caloriasPor100g: 59, grasasPor100g: 0, hidratosPor100g: 3.6, proteinasPor100g: 10 },
      { nombre: 'Nueces', gramos: 20, caloriasPor100g: 654, grasasPor100g: 65, hidratosPor100g: 14, proteinasPor100g: 15.2 },
      { nombre: 'Miel', gramos: 10, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Batido de proteína vegano con leche de almendra, plátano y avena',
    tipoComida: 'Merienda',
    caloriasTotales: 340,
    proteinasTotales: 24.0,
    grasasTotales: 7.0,
    carbosTotales: 42.0,
    restricciones: ['vegana', 'sin gluten'],
    ingredientes: [
      { nombre: 'Leche de almendra', gramos: 200, caloriasPor100g: 13, grasasPor100g: 1.1, hidratosPor100g: 0.3, proteinasPor100g: 0.4 },
      { nombre: 'Proteína vegana en polvo', gramos: 25, caloriasPor100g: 400, grasasPor100g: 7, hidratosPor100g: 8, proteinasPor100g: 67 },
      { nombre: 'Plátano', gramos: 80, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 },
      { nombre: 'Avena integral', gramos: 20, caloriasPor100g: 372, grasasPor100g: 7, hidratosPor100g: 60, proteinasPor100g: 13 }
    ]
  },
  {
    nombre: 'Hummus con palitos de zanahoria, pepino y pan pita integral',
    tipoComida: 'Merienda',
    caloriasTotales: 330,
    proteinasTotales: 10.0,
    grasasTotales: 14.0,
    carbosTotales: 45.0,
    restricciones: ['vegetariana'],
    ingredientes: [
      { nombre: 'Hummus', gramos: 70, caloriasPor100g: 166, grasasPor100g: 9.6, hidratosPor100g: 14.3, proteinasPor100g: 7.9 },
      { nombre: 'Zanahoria', gramos: 50, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Pepino', gramos: 50, caloriasPor100g: 16, grasasPor100g: 0.1, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Pan pita integral', gramos: 50, caloriasPor100g: 270, grasasPor100g: 3.5, hidratosPor100g: 50, proteinasPor100g: 8 }
    ]
  },
  {
    nombre: 'Tostada integral con crema de cacahuete y plátano',
    tipoComida: 'Merienda',
    caloriasTotales: 360,
    proteinasTotales: 12.0,
    grasasTotales: 15.0,
    carbosTotales: 48.0,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Pan integral', gramos: 60, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Crema de cacahuete', gramos: 20, caloriasPor100g: 588, grasasPor100g: 50, hidratosPor100g: 20, proteinasPor100g: 25 },
      { nombre: 'Plátano', gramos: 80, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 }
    ]
  },
  {
    nombre: 'Smoothie bowl vegano con granola sin frutos secos',
    tipoComida: 'Merienda',
    caloriasTotales: 498,
    proteinasTotales: 13.4,
    grasasTotales: 13.7,
    carbosTotales: 82.0,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Yogur de soja', gramos: 150, caloriasPor100g: 54, grasasPor100g: 1.8, hidratosPor100g: 6.9, proteinasPor100g: 3.8 },
      { nombre: 'Granola sin frutos secos', gramos: 50, caloriasPor100g: 450, grasasPor100g: 12, hidratosPor100g: 70, proteinasPor100g: 8 },
      { nombre: 'Plátano', gramos: 100, caloriasPor100g: 89, grasasPor100g: 0.3, hidratosPor100g: 23, proteinasPor100g: 1.1 },
      { nombre: 'Semillas de chía', gramos: 15, caloriasPor100g: 486, grasasPor100g: 31, hidratosPor100g: 42, proteinasPor100g: 17 },
      { nombre: 'Miel', gramos: 10, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Tostada integral con aguacate, pavo y huevo',
    tipoComida: 'Merienda',
    caloriasTotales: 476,
    proteinasTotales: 29.6,
    grasasTotales: 25.5,
    carbosTotales: 35.3,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Pan integral', gramos: 60, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Aguacate', gramos: 70, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Pechuga de pavo', gramos: 50, caloriasPor100g: 135, grasasPor100g: 1.7, hidratosPor100g: 0, proteinasPor100g: 29 },
      { nombre: 'Huevo entero', gramos: 60, caloriasPor100g: 155, grasasPor100g: 11, hidratosPor100g: 1.1, proteinasPor100g: 13 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Tomate cherry', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 }
    ]
  },
  {
    nombre: 'Ensalada de quinoa con garbanzos y semillas de girasol',
    tipoComida: 'Merienda',
    caloriasTotales: 526,
    proteinasTotales: 19.3,
    grasasTotales: 25.8,
    carbosTotales: 61.8,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Quinoa cocida', gramos: 120, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Garbanzos cocidos', gramos: 120, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Pepino', gramos: 50, caloriasPor100g: 16, grasasPor100g: 0.1, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Tomate', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Semillas de girasol', gramos: 15, caloriasPor100g: 584, grasasPor100g: 51, hidratosPor100g: 20, proteinasPor100g: 21 }
    ]
  },
  {
    nombre: 'Batido ligero de frutas y semillas',
    tipoComida: 'Merienda',
    caloriasTotales: 224,
    proteinasTotales: 7.4,
    grasasTotales: 5.1,
    carbosTotales: 41.4,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Manzana', gramos: 150, caloriasPor100g: 52, grasasPor100g: 0.2, hidratosPor100g: 14, proteinasPor100g: 0.3 },
      { nombre: 'Queso fresco', gramos: 30, caloriasPor100g: 96, grasasPor100g: 4.9, hidratosPor100g: 2.2, proteinasPor100g: 11 },
      { nombre: 'Pan integral', gramos: 30, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Semillas de lino', gramos: 5, caloriasPor100g: 534, grasasPor100g: 42, hidratosPor100g: 28.9, proteinasPor100g: 18.3 },
      { nombre: 'Miel', gramos: 5, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Hummus con palitos de zanahoria, pepino y crackers sin gluten',
    tipoComida: 'Merienda',
    caloriasTotales: 215,
    proteinasTotales: 6.8,
    grasasTotales: 8.1,
    carbosTotales: 28.3,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Hummus', gramos: 50, caloriasPor100g: 166, grasasPor100g: 9.6, hidratosPor100g: 14.3, proteinasPor100g: 7.9 },
      { nombre: 'Zanahoria', gramos: 100, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Pepino', gramos: 100, caloriasPor100g: 16, grasasPor100g: 0.1, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Crackers sin gluten', gramos: 15, caloriasPor100g: 500, grasasPor100g: 20, hidratosPor100g: 50, proteinasPor100g: 8 }
    ]
  },
  ///////////////////////////////CENA//////////////////////////////////////////////////////
  {
    nombre: 'Salmón a la plancha con batata, espinacas salteadas y quinoa',
    tipoComida: 'Cena',
    caloriasTotales: 827,
    proteinasTotales: 50.8,
    grasasTotales: 38.5,
    carbosTotales: 66.7,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Salmón', gramos: 200, caloriasPor100g: 208, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Batata', gramos: 200, caloriasPor100g: 86, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.6 },
      { nombre: 'Espinacas', gramos: 100, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Ajo', gramos: 5, caloriasPor100g: 149, grasasPor100g: 0.5, hidratosPor100g: 33.1, proteinasPor100g: 6.4 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 }
    ]
  },
  {
    nombre: 'Pechuga de pavo con puré de coliflor, zanahorias glaseadas y semillas de girasol',
    tipoComida: 'Cena',
    caloriasTotales: 820,
    proteinasTotales: 58.3,
    grasasTotales: 26.4,
    carbosTotales: 87.2,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Pechuga de pavo', gramos: 150, caloriasPor100g: 135, grasasPor100g: 1.7, hidratosPor100g: 0, proteinasPor100g: 29 },
      { nombre: 'Coliflor', gramos: 200, caloriasPor100g: 25, grasasPor100g: 0.1, hidratosPor100g: 5, proteinasPor100g: 2 },
      { nombre: 'Leche de almendra', gramos: 50, caloriasPor100g: 13, grasasPor100g: 1.1, hidratosPor100g: 0.3, proteinasPor100g: 0.4 },
      { nombre: 'Zanahoria', gramos: 150, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Miel', gramos: 10, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 },
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Patata cocida', gramos: 150, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Semillas de girasol', gramos: 10, caloriasPor100g: 584, grasasPor100g: 51, hidratosPor100g: 20, proteinasPor100g: 21 },
      { nombre: 'Aceite de oliva', gramos: 15, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Pasta integral con tofu, salsa de tomate, queso vegano y pan de ajo',
    tipoComida: 'Cena',
    caloriasTotales: 780,
    proteinasTotales: 27.3,
    grasasTotales: 34.2,
    carbosTotales: 90.1,
    restricciones: ['vegana', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Pasta integral', gramos: 80, caloriasPor100g: 350, grasasPor100g: 3.5, hidratosPor100g: 68, proteinasPor100g: 12 },
      { nombre: 'Tofu', gramos: 100, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Tomate triturado', gramos: 150, caloriasPor100g: 29, grasasPor100g: 0.4, hidratosPor100g: 5.5, proteinasPor100g: 1.5 },
      { nombre: 'Queso vegano rallado', gramos: 50, caloriasPor100g: 280, grasasPor100g: 20, hidratosPor100g: 4, proteinasPor100g: 5 },
      { nombre: 'Pan de ajo integral', gramos: 40, caloriasPor100g: 260, grasasPor100g: 5, hidratosPor100g: 50, proteinasPor100g: 7 },
      { nombre: 'Ajo', gramos: 5, caloriasPor100g: 149, grasasPor100g: 0.5, hidratosPor100g: 33.1, proteinasPor100g: 6.4 },
      { nombre: 'Albahaca fresca', gramos: 10, caloriasPor100g: 23, grasasPor100g: 0.6, hidratosPor100g: 2.7, proteinasPor100g: 3.2 },
      { nombre: 'Aceite de oliva', gramos: 15, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Tacos de lechuga con carne magra, frijoles negros, tortitas de maíz y quinoa',
    tipoComida: 'Cena',
    caloriasTotales: 797,
    proteinasTotales: 44.4,
    grasasTotales: 36.4,
    carbosTotales: 73.1,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Carne picada magra (ternera)', gramos: 150, caloriasPor100g: 172, grasasPor100g: 10, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Frijoles negros cocidos', gramos: 100, caloriasPor100g: 132, grasasPor100g: 0.5, hidratosPor100g: 23, proteinasPor100g: 9 },
      { nombre: 'Lechuga iceberg', gramos: 50, caloriasPor100g: 15, grasasPor100g: 0.2, hidratosPor100g: 2.9, proteinasPor100g: 1.4 },
      { nombre: 'Tomate', gramos: 100, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Tortitas de maíz sin gluten', gramos: 60, caloriasPor100g: 230, grasasPor100g: 3.5, hidratosPor100g: 42, proteinasPor100g: 7 },
      { nombre: 'Quinoa cocida', gramos: 50, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  }, 
  {
    nombre: 'Merluza a la plancha con quinoa, patata, brócoli, espinacas y pan',
    tipoComida: 'Cena',
    caloriasTotales: 625,
    proteinasTotales: 42.0,
    grasasTotales: 15.2,
    carbosTotales: 83.0,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Merluza', gramos: 150, caloriasPor100g: 70, grasasPor100g: 0.9, hidratosPor100g: 0, proteinasPor100g: 17 },
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Patata cocida', gramos: 150, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Brócoli', gramos: 100, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 },
      { nombre: 'Espinacas', gramos: 100, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Pan integral', gramos: 50, caloriasPor100g: 250, grasasPor100g: 2, hidratosPor100g: 44, proteinasPor100g: 9 }
    ]
  },
  {
    nombre: 'Pechuga de pavo con puré de coliflor, zanahoria glaseada, quinoa y pan',
    tipoComida: 'Cena',
    caloriasTotales: 588,
    proteinasTotales: 56.4,
    grasasTotales: 10.7,
    carbosTotales: 66.8,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Pechuga de pavo', gramos: 150, caloriasPor100g: 135, grasasPor100g: 1.7, hidratosPor100g: 0, proteinasPor100g: 29 },
      { nombre: 'Coliflor', gramos: 200, caloriasPor100g: 25, grasasPor100g: 0.1, hidratosPor100g: 5, proteinasPor100g: 2 },
      { nombre: 'Zanahoria glaseada', gramos: 100, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Miel', gramos: 10, caloriasPor100g: 304, grasasPor100g: 0, hidratosPor100g: 82, proteinasPor100g: 0 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Pan integral', gramos: 40, caloriasPor100g: 250, grasasPor100g: 2, hidratosPor100g: 44, proteinasPor100g: 9 }
    ]
  },
  {
    nombre: 'Ensalada templada de quinoa con tofu, espinacas, tomate cherry, semillas de girasol, aguacate y pan',
    tipoComida: 'Cena',
    caloriasTotales: 544,
    proteinasTotales: 24.0,
    grasasTotales: 25.0,
    carbosTotales: 59.0,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Tofu', gramos: 100, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Espinacas', gramos: 100, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Tomate cherry', gramos: 100, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Semillas de girasol', gramos: 10, caloriasPor100g: 584, grasasPor100g: 51, hidratosPor100g: 20, proteinasPor100g: 21 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Pan integral', gramos: 50, caloriasPor100g: 250, grasasPor100g: 2, hidratosPor100g: 44, proteinasPor100g: 9 }
    ]
  },
  {
    nombre: 'Pasta integral con tofu, tomate y queso vegano',
    tipoComida: 'Cena',
    caloriasTotales: 559,
    proteinasTotales: 20.0,
    grasasTotales: 27.5,
    carbosTotales: 52.2,
    restricciones: ['vegana', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Pasta integral', gramos: 60, caloriasPor100g: 350, grasasPor100g: 3.5, hidratosPor100g: 68, proteinasPor100g: 12 },
      { nombre: 'Tofu', gramos: 100, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Tomate triturado', gramos: 150, caloriasPor100g: 29, grasasPor100g: 0.4, hidratosPor100g: 5.5, proteinasPor100g: 1.5 },
      { nombre: 'Queso vegano rallado', gramos: 50, caloriasPor100g: 280, grasasPor100g: 20, hidratosPor100g: 4, proteinasPor100g: 5 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Merluza al horno con patata asada y brócoli',
    tipoComida: 'Cena',
    caloriasTotales: 750,
    proteinasTotales: 45.0,
    grasasTotales: 24.0,
    carbosTotales: 82.0,
    restricciones: ['sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Merluza', gramos: 150, caloriasPor100g: 70, grasasPor100g: 0.9, hidratosPor100g: 0, proteinasPor100g: 17 },
      { nombre: 'Patata', gramos: 200, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Brócoli', gramos: 100, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Hamburguesa de ternera con batata al horno',
    tipoComida: 'Cena',
    caloriasTotales: 800,
    proteinasTotales: 52.0,
    grasasTotales: 35.0,
    carbosTotales: 88.0,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Carne de ternera magra', gramos: 150, caloriasPor100g: 172, grasasPor100g: 10, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Pan integral', gramos: 80, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Batata', gramos: 150, caloriasPor100g: 86, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.6 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Ensalada templada de lentejas con queso feta y nueces',
    tipoComida: 'Cena',
    caloriasTotales: 740,
    proteinasTotales: 28.0,
    grasasTotales: 30.0,
    carbosTotales: 75.0,
    restricciones: ['sin gluten'],
    ingredientes: [
      { nombre: 'Lentejas cocidas', gramos: 150, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Queso feta', gramos: 50, caloriasPor100g: 264, grasasPor100g: 21, hidratosPor100g: 4, proteinasPor100g: 14 },
      { nombre: 'Nueces', gramos: 15, caloriasPor100g: 654, grasasPor100g: 65, hidratosPor100g: 14, proteinasPor100g: 15.2 },
      { nombre: 'Espinacas', gramos: 50, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Salteado de ternera con noodles de arroz y verduras',
    tipoComida: 'Cena',
    caloriasTotales: 770,
    proteinasTotales: 40.0,
    grasasTotales: 28.0,
    carbosTotales: 85.0,
    restricciones: ['sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Ternera magra', gramos: 150, caloriasPor100g: 172, grasasPor100g: 10, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Noodles de arroz', gramos: 100, caloriasPor100g: 109, grasasPor100g: 0.2, hidratosPor100g: 26, proteinasPor100g: 1.8 },
      { nombre: 'Zanahoria', gramos: 50, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Pimiento verde', gramos: 50, caloriasPor100g: 20, grasasPor100g: 0.2, hidratosPor100g: 4, proteinasPor100g: 1 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Pasta integral con boloñesa de ternera y queso parmesano',
    tipoComida: 'Cena',
    caloriasTotales: 970,
    proteinasTotales: 59,
    grasasTotales: 39,
    carbosTotales: 97,
    restricciones: ['sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Pasta integral', gramos: 100, caloriasPor100g: 350, grasasPor100g: 3.5, hidratosPor100g: 68, proteinasPor100g: 12 },
      { nombre: 'Ternera magra picada', gramos: 150, caloriasPor100g: 172, grasasPor100g: 10, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Tomate triturado', gramos: 100, caloriasPor100g: 29, grasasPor100g: 0.4, hidratosPor100g: 5.5, proteinasPor100g: 1.5 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Cebolla', gramos: 50, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 },
      { nombre: 'Zanahoria', gramos: 50, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Pan integral', gramos: 30, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 },
      { nombre: 'Queso parmesano', gramos: 30, caloriasPor100g: 431, grasasPor100g: 29, hidratosPor100g: 3.2, proteinasPor100g: 38 }
    ]
  },
  {
    nombre: 'Arroz integral con salmón, aguacate y nueces',
    tipoComida: 'Cena',
    caloriasTotales: 985,
    proteinasTotales: 44,
    grasasTotales: 52,
    carbosTotales: 90,
    restricciones: ['sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Arroz integral cocido', gramos: 150, caloriasPor100g: 111, grasasPor100g: 0.9, hidratosPor100g: 23, proteinasPor100g: 2.6 },
      { nombre: 'Salmón', gramos: 150, caloriasPor100g: 208, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Patata asada', gramos: 200, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Aguacate', gramos: 70, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Nueces', gramos: 15, caloriasPor100g: 654, grasasPor100g: 65, hidratosPor100g: 14, proteinasPor100g: 15.2 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Brócoli', gramos: 100, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 }
    ]
  },
  {
    nombre: 'Pizza casera integral de pollo y mozzarella',
    tipoComida: 'Cena',
    caloriasTotales: 955,
    proteinasTotales: 67,
    grasasTotales: 36,
    carbosTotales: 97,
    restricciones: ['ninguna'],
    ingredientes: [
      { nombre: 'Harina integral', gramos: 120, caloriasPor100g: 340, grasasPor100g: 2.5, hidratosPor100g: 70, proteinasPor100g: 12 },
      { nombre: 'Tomate triturado', gramos: 80, caloriasPor100g: 29, grasasPor100g: 0.4, hidratosPor100g: 5.5, proteinasPor100g: 1.5 },
      { nombre: 'Mozzarella', gramos: 80, caloriasPor100g: 280, grasasPor100g: 22, hidratosPor100g: 3, proteinasPor100g: 22 },
      { nombre: 'Pechuga de pollo', gramos: 100, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Aguacate', gramos: 50, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Champiñones', gramos: 50, caloriasPor100g: 22, grasasPor100g: 0.3, hidratosPor100g: 3.3, proteinasPor100g: 3.1 }
    ]
  },
  {
    nombre: 'Ensalada de quinoa con pechuga de pollo y verduras',
    tipoComida: 'Cena',
    caloriasTotales: 453,
    proteinasTotales: 38.2,
    grasasTotales: 20.4,
    carbosTotales: 30.4,
    restricciones: ['sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Quinoa cocida', gramos: 100, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Pechuga de pollo', gramos: 100, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Lechuga', gramos: 50, caloriasPor100g: 15, grasasPor100g: 0.2, hidratosPor100g: 2.9, proteinasPor100g: 1.4 },
      { nombre: 'Pepino', gramos: 50, caloriasPor100g: 16, grasasPor100g: 0.1, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Tomate cherry', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Aguacate', gramos: 30, caloriasPor100g: 160, grasasPor100g: 15, hidratosPor100g: 9, proteinasPor100g: 2 },
      { nombre: 'Aceite de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Crema de verduras con queso fresco y pan integral',
    tipoComida: 'Cena',
    caloriasTotales: 296,
    proteinasTotales: 11.2,
    grasasTotales: 8.6,
    carbosTotales: 42.6,
    restricciones: ['sin gluten'],
    ingredientes: [
      { nombre: 'Calabaza', gramos: 100, caloriasPor100g: 26, grasasPor100g: 0.1, hidratosPor100g: 3.1, proteinasPor100g: 1 },
      { nombre: 'Zanahoria', gramos: 50, caloriasPor100g: 41, grasasPor100g: 0.24, hidratosPor100g: 10, proteinasPor100g: 0.9 },
      { nombre: 'Cebolla', gramos: 50, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 },
      { nombre: 'Patata', gramos: 100, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Aceite de oliva', gramos: 5, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Queso fresco', gramos: 50, caloriasPor100g: 96, grasasPor100g: 4.9, hidratosPor100g: 2.2, proteinasPor100g: 11 },
      { nombre: 'Pan integral', gramos: 20, caloriasPor100g: 250, grasasPor100g: 4, hidratosPor100g: 44, proteinasPor100g: 9 }
    ]
  },
  {
    nombre: 'Bol de pollo a la parrilla con batata y quinoa',
    tipoComida: 'Cena',
    caloriasTotales: 602,
    proteinasTotales: 45.2,
    grasasTotales: 20.8,
    carbosTotales: 59.4,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Pechuga de pollo', gramos: 120, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Batata asada', gramos: 150, caloriasPor100g: 86, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.6 },
      { nombre: 'Quinoa cocida', gramos: 50, caloriasPor100g: 120, grasasPor100g: 1.9, hidratosPor100g: 21, proteinasPor100g: 4.4 },
      { nombre: 'Judías verdes', gramos: 80, caloriasPor100g: 27, grasasPor100g: 0.1, hidratosPor100g: 3.9, proteinasPor100g: 1.8 },
      { nombre: 'Tomate cherry', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Bacalao al horno con espinacas, patata y aceite de oliva',
    tipoComida: 'Cena',
    caloriasTotales: 528,
    proteinasTotales: 42.0,
    grasasTotales: 22.6,
    carbosTotales: 44.2,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Bacalao', gramos: 200, caloriasPor100g: 70, grasasPor100g: 0.7, hidratosPor100g: 0, proteinasPor100g: 17 },
      { nombre: 'Patata cocida', gramos: 100, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Espinacas', gramos: 80, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Tomate', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Albóndigas de pavo con pasta integral y salsa de tomate',
    tipoComida: 'Cena',
    caloriasTotales: 655,
    proteinasTotales: 47.5,
    grasasTotales: 22.2,
    carbosTotales: 65.8,
    restricciones: ['sin lactosa'],
    ingredientes: [
      { nombre: 'Pavo picado', gramos: 150, caloriasPor100g: 135, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Pasta integral cocida', gramos: 100, caloriasPor100g: 122, grasasPor100g: 1.9, hidratosPor100g: 25.8, proteinasPor100g: 5 },
      { nombre: 'Tomate triturado', gramos: 100, caloriasPor100g: 29, grasasPor100g: 0.4, hidratosPor100g: 5.5, proteinasPor100g: 1.5 },
      { nombre: 'Queso parmesano rallado', gramos: 20, caloriasPor100g: 431, grasasPor100g: 29, hidratosPor100g: 3.2, proteinasPor100g: 38 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Cebolla', gramos: 30, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 }
    ]
  },
  {
    nombre: 'Salteado vegano de tofu con noodles de arroz y verduras',
    tipoComida: 'Cena',
    caloriasTotales: 572,
    proteinasTotales: 25.3,
    grasasTotales: 21.6,
    carbosTotales: 65.9,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Tofu firme', gramos: 150, caloriasPor100g: 76, grasasPor100g: 4.8, hidratosPor100g: 1.9, proteinasPor100g: 8 },
      { nombre: 'Noodles de arroz cocidos', gramos: 100, caloriasPor100g: 109, grasasPor100g: 0.2, hidratosPor100g: 26, proteinasPor100g: 1.8 },
      { nombre: 'Berenjena asada', gramos: 80, caloriasPor100g: 25, grasasPor100g: 0.2, hidratosPor100g: 5.9, proteinasPor100g: 1 },
      { nombre: 'Pimiento rojo', gramos: 50, caloriasPor100g: 31, grasasPor100g: 0.3, hidratosPor100g: 6, proteinasPor100g: 1 },
      { nombre: 'Brócoli', gramos: 50, caloriasPor100g: 34, grasasPor100g: 0.4, hidratosPor100g: 7, proteinasPor100g: 2.8 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Bowl de ternera estilo fajita con arroz integral y frijoles negros',
    tipoComida: 'Cena',
    caloriasTotales: 697,
    proteinasTotales: 41.3,
    grasasTotales: 24.5,
    carbosTotales: 72.8,
    restricciones: ['sin gluten', 'sin lactosa'],
    ingredientes: [
      { nombre: 'Ternera magra', gramos: 150, caloriasPor100g: 172, grasasPor100g: 10, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Arroz integral cocido', gramos: 100, caloriasPor100g: 111, grasasPor100g: 0.9, hidratosPor100g: 23, proteinasPor100g: 2.6 },
      { nombre: 'Frijoles negros cocidos', gramos: 50, caloriasPor100g: 132, grasasPor100g: 0.5, hidratosPor100g: 23, proteinasPor100g: 9 },
      { nombre: 'Pimiento verde', gramos: 50, caloriasPor100g: 20, grasasPor100g: 0.2, hidratosPor100g: 4, proteinasPor100g: 1 },
      { nombre: 'Cebolla', gramos: 50, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Ensalada templada de lentejas con feta y semillas de girasol',
    tipoComida: 'Cena',
    caloriasTotales: 533,
    proteinasTotales: 24.8,
    grasasTotales: 23.1,
    carbosTotales: 57.3,
    restricciones: ['sin gluten'],
    ingredientes: [
      { nombre: 'Lentejas cocidas', gramos: 150, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Queso feta', gramos: 40, caloriasPor100g: 264, grasasPor100g: 21, hidratosPor100g: 4, proteinasPor100g: 14 },
      { nombre: 'Pepino', gramos: 50, caloriasPor100g: 16, grasasPor100g: 0.1, hidratosPor100g: 3.6, proteinasPor100g: 0.7 },
      { nombre: 'Tomate cherry', gramos: 50, caloriasPor100g: 18, grasasPor100g: 0.2, hidratosPor100g: 3.9, proteinasPor100g: 0.9 },
      { nombre: 'Semillas de girasol', gramos: 15, caloriasPor100g: 584, grasasPor100g: 51, hidratosPor100g: 20, proteinasPor100g: 21 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Salmón a la plancha con puré de coliflor y espárragos',
    tipoComida: 'Cena',
    caloriasTotales: 648,
    proteinasTotales: 39.2,
    grasasTotales: 34.4,
    carbosTotales: 28.6,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Salmón', gramos: 150, caloriasPor100g: 208, grasasPor100g: 13, hidratosPor100g: 0, proteinasPor100g: 20 },
      { nombre: 'Coliflor (para puré)', gramos: 200, caloriasPor100g: 25, grasasPor100g: 0.1, hidratosPor100g: 5, proteinasPor100g: 2 },
      { nombre: 'Mantequilla de oliva', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Espárragos', gramos: 100, caloriasPor100g: 20, grasasPor100g: 0.12, hidratosPor100g: 3.9, proteinasPor100g: 2.2 }
    ]
  },
  {
    nombre: 'Curry de garbanzos con arroz integral y espinacas',
    tipoComida: 'Cena',
    caloriasTotales: 698,
    proteinasTotales: 22.4,
    grasasTotales: 28.0,
    carbosTotales: 80.0,
    restricciones: ['vegana', 'sin lactosa', 'sin gluten', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Garbanzos cocidos', gramos: 200, caloriasPor100g: 164, grasasPor100g: 2.6, hidratosPor100g: 27.4, proteinasPor100g: 8.9 },
      { nombre: 'Arroz integral cocido', gramos: 100, caloriasPor100g: 111, grasasPor100g: 0.9, hidratosPor100g: 23, proteinasPor100g: 2.6 },
      { nombre: 'Leche de coco light', gramos: 50, caloriasPor100g: 150, grasasPor100g: 15, hidratosPor100g: 2, proteinasPor100g: 1.5 },
      { nombre: 'Curry en polvo', gramos: 10, caloriasPor100g: 325, grasasPor100g: 14, hidratosPor100g: 58, proteinasPor100g: 12 },
      { nombre: 'Espinacas', gramos: 50, caloriasPor100g: 23, grasasPor100g: 0.4, hidratosPor100g: 3.6, proteinasPor100g: 2.9 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  },
  {
    nombre: 'Paella mixta de verduras, pollo y arroz',
    tipoComida: 'Cena',
    caloriasTotales: 712,
    proteinasTotales: 38.0,
    grasasTotales: 24.0,
    carbosTotales: 75.0,
    restricciones: ['sin lactosa', 'sin gluten'],
    ingredientes: [
      { nombre: 'Arroz', gramos: 150, caloriasPor100g: 130, grasasPor100g: 0.3, hidratosPor100g: 28, proteinasPor100g: 2.4 },
      { nombre: 'Pechuga de pollo', gramos: 100, caloriasPor100g: 165, grasasPor100g: 3.6, hidratosPor100g: 0, proteinasPor100g: 31 },
      { nombre: 'Mezcla de verduras (pimiento, guisantes)', gramos: 100, caloriasPor100g: 50, grasasPor100g: 0.5, hidratosPor100g: 10, proteinasPor100g: 3 },
      { nombre: 'Caldo de pollo', gramos: 100, caloriasPor100g: 10, grasasPor100g: 0.2, hidratosPor100g: 1, proteinasPor100g: 1 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 10, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 },
      { nombre: 'Azafrán', gramos: 1, caloriasPor100g: 310, grasasPor100g: 6.4, hidratosPor100g: 65, proteinasPor100g: 11 }
    ]
  },
  {
    nombre: 'Tortilla española con pimientos y cebolla',
    tipoComida: 'Cena',
    caloriasTotales: 594,
    proteinasTotales: 20.0,
    grasasTotales: 36.0,
    carbosTotales: 49.0,
    restricciones: ['sin gluten', 'sin lactosa', 'apta para alérgicos a frutos secos'],
    ingredientes: [
      { nombre: 'Patata', gramos: 200, caloriasPor100g: 87, grasasPor100g: 0.1, hidratosPor100g: 20.1, proteinasPor100g: 1.9 },
      { nombre: 'Huevo entero', gramos: 180, caloriasPor100g: 155, grasasPor100g: 11, hidratosPor100g: 1.1, proteinasPor100g: 13 },
      { nombre: 'Pimiento rojo', gramos: 50, caloriasPor100g: 31, grasasPor100g: 0.3, hidratosPor100g: 6, proteinasPor100g: 1 },
      { nombre: 'Cebolla', gramos: 50, caloriasPor100g: 40, grasasPor100g: 0.1, hidratosPor100g: 9, proteinasPor100g: 1.1 },
      { nombre: 'Aceite de oliva virgen extra', gramos: 20, caloriasPor100g: 884, grasasPor100g: 100, hidratosPor100g: 0, proteinasPor100g: 0 }
    ]
  }

];

async function seed() {
  const db = admin.firestore();
  const batch = db.batch();
  const col = db.collection('recipes');

  // Si quieres vaciar la colección antes, descomenta:
  // const snapshot = await col.get();
  // snapshot.forEach(doc => batch.delete(doc.ref));

  recipes.forEach(r => {
    const ref = col.doc();
    batch.set(ref, r);
  });

  await batch.commit();
  console.log('✔ Recipes seeded');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error al hacer seed:', err);
  process.exit(1);
});

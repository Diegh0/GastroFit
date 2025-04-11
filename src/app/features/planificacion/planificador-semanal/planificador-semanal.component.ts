// import { Component, OnInit } from '@angular/core';
// import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
// import { Comida } from 'src/app/core/models/comida.model';
// import { ComidaService } from 'src/app/core/services/comida.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { ConfirmacionDialogComponent } from 'src/app/shared/components/confirmacion-dialog/confirmacion-dialog.component';

// @Component({
//   selector: 'app-planificador-semanal',
//   templateUrl: './planificador-semanal.component.html',
//   styleUrls: ['./planificador-semanal.component.scss'],
//   imports: [CommonModule, DragDropModule, FormsModule],
// })
// export class PlanificadorSemanalComponent implements OnInit {
//   dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
//   franjas = ['Desayuno', 'Comida', 'Merienda', 'Cena'];
//   comidasDisponibles: Comida[] = [];
//   planificacion: { [franja: string]: { [dia: string]: Comida[] } } = {};
//   celdasIds: string[] = [];
//   mostrarResumenSemanal = false;
//   resumenSemanal: { calorias: number, proteinas: number, grasas: number, hidratos: number } | null = null;
//   resumenPorDia: { [dia: string]: { calorias: number, proteinas: number, grasas: number, hidratos: number } } = {};
//   mostrarResumenDia: { [dia: string]: boolean } = {};
//   fechaSemana: string = this.obtenerLunesDesdeFecha(new Date().toISOString().split('T')[0]);
//   mostrarDuplicador = false;
//   fechaDuplicar = '';
//   semanasGuardadas: string[] = [];
//   mostrarHistorial = false;
//   mostrarModalDuplicado = false;
//   origenADuplicar = '';
//   fechaDestinoDuplicado = '';
//   mostrarModalFranja = false;
//   nombreNuevaFranja = '';

//   constructor(private comidaService: ComidaService, private dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.comidasDisponibles = this.comidaService.getComidas();
//     const datosGuardados = localStorage.getItem('planificaciones');
//     const todas = datosGuardados ? JSON.parse(datosGuardados) : {};

//     if (todas[this.fechaSemana]) {
//       this.planificacion = todas[this.fechaSemana];
//     } else {
//       this.crearPlanificacionVaciaInicial();
//     }

//     this.actualizarCeldasIds();
//     this.actualizarSemanasGuardadas();
//   }

//   onDrop(event: CdkDragDrop<Comida[]>, dia: string, franja: string) {
//     if (event.previousContainer.id === 'lista-comidas') {
//       const comida = { ...event.item.data };
//       delete comida.imagen;
//       this.planificacion[franja][dia].push(comida);
//       this.guardarPlanificacion();
//     }
//   }

//   eliminarComida(dia: string, franja: string, index: number): void {
//     this.planificacion[franja][dia].splice(index, 1);
//     this.guardarPlanificacion();
//   }

//   abrirModalFranja(): void {
//     this.nombreNuevaFranja = '';
//     this.mostrarModalFranja = true;
//   }

//   confirmarAgregarFranja(): void {
//     const nueva = this.nombreNuevaFranja.trim();
//     if (nueva && !this.franjas.includes(nueva)) {
//       this.franjas.push(nueva);
//       this.planificacion[nueva] = {};
//       this.dias.forEach(dia => {
//         this.planificacion[nueva][dia] = [];
//       });
//       this.actualizarCeldasIds();
//       this.guardarPlanificacion();
//     }
//     this.mostrarModalFranja = false;
//   }

//   verResumenSemanal(): void {
//     this.resumenSemanal = this.calcularResumenSemanal();
//     this.mostrarResumenSemanal = true;
//   }

//   calcularResumenSemanal(): { calorias: number, proteinas: number, grasas: number, hidratos: number } {
//     const resumen = { calorias: 0, proteinas: 0, grasas: 0, hidratos: 0 };
//     for (const franja of this.franjas) {
//       for (const dia of this.dias) {
//         const comidas = this.planificacion[franja][dia];
//         for (const comida of comidas) {
//           for (const ing of comida.ingredientes) {
//             const factor = ing.gramos / 100;
//             resumen.calorias += ing.caloriasPor100g * factor;
//             resumen.proteinas += ing.proteinas * factor;
//             resumen.grasas += ing.grasas * factor;
//             resumen.hidratos += ing.hidratos * factor;
//           }
//         }
//       }
//     }
//     return {
//       calorias: Math.round(resumen.calorias),
//       proteinas: Math.round(resumen.proteinas),
//       grasas: Math.round(resumen.grasas),
//       hidratos: Math.round(resumen.hidratos)
//     };
//   }

//   calcularResumenPorDia(dia: string): void {
//     const resumen = { calorias: 0, proteinas: 0, grasas: 0, hidratos: 0 };
//     for (const franja of this.franjas) {
//       const comidas = this.planificacion[franja][dia];
//       for (const comida of comidas) {
//         for (const ing of comida.ingredientes) {
//           const factor = ing.gramos / 100;
//           resumen.calorias += ing.caloriasPor100g * factor;
//           resumen.proteinas += ing.proteinas * factor;
//           resumen.grasas += ing.grasas * factor;
//           resumen.hidratos += ing.hidratos * factor;
//         }
//       }
//     }
//     this.resumenPorDia[dia] = {
//       calorias: Math.round(resumen.calorias),
//       proteinas: Math.round(resumen.proteinas),
//       grasas: Math.round(resumen.grasas),
//       hidratos: Math.round(resumen.hidratos)
//     };
//     this.mostrarResumenDia[dia] = !this.mostrarResumenDia[dia];
//   }

//   obtenerLunesDesdeFecha(fecha: string): string {
//     const date = new Date(fecha);
//     const dia = date.getDay();
//     const diff = date.getDate() - dia + (dia === 0 ? -6 : 1);
//     const lunes = new Date(date.setDate(diff));
//     return lunes.toISOString().split('T')[0];
//   }

//   cambiarSemana(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     const fechaSeleccionada = input?.value;
//     if (!fechaSeleccionada) return;
//     const lunesSemana = this.obtenerLunesDesdeFecha(fechaSeleccionada);
//     this.fechaSemana = lunesSemana;
//     this.mostrarResumenDia = {};
//     const datosGuardados = localStorage.getItem('planificaciones');
//     const todas = datosGuardados ? JSON.parse(datosGuardados) : {};
//     this.planificacion = todas[this.fechaSemana] || this.crearPlanificacionVacia();
//     this.actualizarCeldasIds();
//   }

//   ejecutarDuplicado(): void {
//     if (!this.fechaDuplicar) return;
//     const lunesDestino = this.obtenerLunesDesdeFecha(this.fechaDuplicar);
//     const datosGuardados = localStorage.getItem('planificaciones');
//     const todas = datosGuardados ? JSON.parse(datosGuardados) : {};
//     if (todas[lunesDestino]) {
//       const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
//         data: {
//           mensaje: `Ya existe una semana para el ${lunesDestino}. ¿Deseas sobrescribirla?`
//         }
//       });
//       dialogRef.afterClosed().subscribe(result => {
//         if (result === true) {
//           todas[lunesDestino] = JSON.parse(JSON.stringify(this.planificacion));
//           localStorage.setItem('planificaciones', JSON.stringify(todas));
//           this.actualizarSemanasGuardadas();
//           this.mostrarDuplicador = false;
//           this.fechaDuplicar = '';
//         }
//       });
//       return;
//     }
//     todas[lunesDestino] = JSON.parse(JSON.stringify(this.planificacion));
//     localStorage.setItem('planificaciones', JSON.stringify(todas));
//     this.mostrarDuplicador = false;
//     this.fechaDuplicar = '';
//     this.actualizarSemanasGuardadas();
//   }

//   eliminarSemana(semana: string): void {
//     const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
//       data: {
//         mensaje: `¿Estás seguro de que quieres eliminar la semana ${semana}?`
//       }
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result === true) {
//         const datos = localStorage.getItem('planificaciones');
//         const todas = datos ? JSON.parse(datos) : {};
//         delete todas[semana];
//         localStorage.setItem('planificaciones', JSON.stringify(todas));
//         this.actualizarSemanasGuardadas();
//       }
//     });
//   }

//   crearPlanificacionVaciaInicial(): void {
//     this.franjas.forEach(franja => {
//       this.planificacion[franja] = {};
//       this.dias.forEach(dia => {
//         this.planificacion[franja][dia] = [];
//       });
//     });
//   }

//   crearPlanificacionVacia(): { [franja: string]: { [dia: string]: Comida[] } } {
//     const nueva: { [franja: string]: { [dia: string]: Comida[] } } = {};
//     this.franjas.forEach(franja => {
//       nueva[franja] = {};
//       this.dias.forEach(dia => {
//         nueva[franja][dia] = [];
//       });
//     });
//     return nueva;
//   }

//   actualizarCeldasIds(): void {
//     this.celdasIds = [];
//     this.franjas.forEach(franja => {
//       this.dias.forEach(dia => {
//         this.celdasIds.push(`celda-${dia}-${franja}`);
//       });
//     });
//   }

//   guardarPlanificacion(): void {
//     const datos = localStorage.getItem('planificaciones');
//     const todas = datos ? JSON.parse(datos) : {};
//     todas[this.fechaSemana] = this.planificacion;
//     localStorage.setItem('planificaciones', JSON.stringify(todas));
//   }

//   actualizarSemanasGuardadas(): void {
//     const datosGuardados = localStorage.getItem('planificaciones');
//     const todas = datosGuardados ? JSON.parse(datosGuardados) : {};
//     this.semanasGuardadas = Object.keys(todas).sort();
//   }
//   cambiarSemanaDesdeHistorial(semana: string): void {
//     this.fechaSemana = semana;
//     const datos = localStorage.getItem('planificaciones');
//     const todas = datos ? JSON.parse(datos) : {};
//     this.planificacion = todas[semana] || this.crearPlanificacionVacia();
//     this.mostrarResumenDia = {};
//     this.actualizarCeldasIds();
//   }
//   duplicarDesdeHistorial(origen: string): void {
//     console.log('🧪 Duplicando desde historial:', origen);

//     this.origenADuplicar = origen;
//     this.fechaDestinoDuplicado = '';
//     this.mostrarModalDuplicado = true;
//   }


 
  
// }
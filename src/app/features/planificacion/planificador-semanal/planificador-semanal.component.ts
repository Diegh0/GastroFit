import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Comida } from 'src/app/core/models/comida.model';
import { ComidaService } from 'src/app/core/services/comida.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from 'src/app/shared/components/confirmacion-dialog/confirmacion-dialog.component';
import { PlanificacionService } from 'src/app/core/services/planificacion.service';
import { AuthService } from 'src/app/services/auth.service';
import { JoyrideService } from 'ngx-joyride';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IaHistoryService } from 'src/app/core/services/ia-history.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-planificador-semanal',
  templateUrl: './planificador-semanal.component.html',
  styleUrls: ['./planificador-semanal.component.scss'],
  imports: [CommonModule, DragDropModule, FormsModule,MatIconModule,
    MatButtonModule,],
})
export class PlanificadorSemanalComponent implements OnInit {
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  franjas = ['Desayuno', 'Comida', 'Merienda', 'Cena'];
  comidasDisponibles: Comida[] = [];
  //comidasDisponiblesId: Comida[] = [];
  planificacion: { [franja: string]: { [dia: string]: Comida[] } } = {};
  celdasIds: string[] = [];
  mostrarResumenSemanal = false;
  resumenSemanal: { calorias: number, proteinas: number, grasas: number, hidratos: number } | null = null;
  resumenPorDia: { [dia: string]: { calorias: number, proteinas: number, grasas: number, hidratos: number } } = {};
  mostrarResumenDia: { [dia: string]: boolean } = {};
  fechaSemana: string = this.obtenerLunesDesdeFecha(new Date().toISOString().split('T')[0]);
  mostrarDuplicador = false;
  fechaDuplicar = '';
  semanasGuardadas: string[] = [];
  mostrarHistorial = false;
  mostrarModalDuplicado = false;
  origenADuplicar = '';
  fechaDestinoDuplicado = '';
  mostrarModalFranja = false;
  nombreNuevaFranja = '';
  mensajeConfirmacion = '';
  mostrarMensaje = false;
  
  constructor(
    private comidaService: ComidaService,
    private planificacionService: PlanificacionService,
    private dialog: MatDialog,
    private auth:AuthService,
    private joyrideService: JoyrideService,
    private location: Location,
    private router: Router,
    private iaHistory: IaHistoryService,
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener comidas manuales del historial
    const comidasNormales = await this.comidaService.getComidas();
  
    // Obtener comidas IA (una sola vez, no observable)
    const iaEntries = await this.iaHistory.getIaHistoryOnce();
  
    // Adaptar las entradas IA al tipo Comida
    const comidasIAAdaptadas: Comida[] = iaEntries.map(entry => ({
      id: entry.recipeId,
      nombre: entry.nombre,
      ingredientes: entry.ingredientes ?? [],
      imagenUrl: entry.imagenUrl || 'assets/imgPredeterminadaCars.png',
      favorita: entry.favorita ?? false,
      fechaCreacion: entry.fechaGeneracion,
      source: 'ia' as 'ia'
    }));
  
    // Unificar ambas listas para mostrar en comidas disponibles
    this.comidasDisponibles = [...comidasNormales, ...comidasIAAdaptadas];
  
    // Cargar planificación semanal desde Firestore
    await this.cargarPlanificacionDesdeFirestore();
  
    // Iniciar tutorial si es la primera vez
    this.iniciarTutorialSiEsPrimeraVez();
  }
  
  
  

  mostrarMensajeTemporal(texto: string) {
    this.mensajeConfirmacion = texto;
    this.mostrarMensaje = true;
  
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000); // 👈 Oculta a los 3 segundos
  }
  
  async cargarPlanificacionDesdeFirestore(): Promise<void> {
    const todas = await this.planificacionService.getPlanificacion(this.fechaSemana);
    if (todas) {
      this.planificacion = todas;
    } else {
      this.crearPlanificacionVaciaInicial();
    }

    this.actualizarCeldasIds();
    await this.actualizarSemanasGuardadas();
  }

  async onDrop(event: CdkDragDrop<Comida[]>, dia: string, franja: string) {
    if (event.previousContainer.id === 'lista-comidas') {
      const comida = { ...event.item.data };
      delete comida.imagen;
      this.planificacion[franja][dia].push(comida);
      await this.guardarPlanificacion();
    }
  }

  async eliminarComida(dia: string, franja: string, index: number): Promise<void> {
    this.planificacion[franja][dia].splice(index, 1);
    await this.guardarPlanificacion();
  }

  abrirModalFranja(): void {
    this.nombreNuevaFranja = '';
    this.mostrarModalFranja = true;
  }

  
  
  confirmarAgregarFranja(): void {
    const nueva = this.nombreNuevaFranja.trim();
    if (nueva && !this.franjas.includes(nueva)) {
      this.franjas.push(nueva);
      this.planificacion[nueva] = {};
      this.dias.forEach(dia => {
        this.planificacion[nueva][dia] = [];
      });
      this.actualizarCeldasIds();
      this.guardarPlanificacion(); // guardamos en Firestore
    }
    this.mostrarModalFranja = false;
  }
  

  verResumenSemanal(): void {
    this.resumenSemanal = this.calcularResumenSemanal();
    this.mostrarResumenSemanal = true;
  }

  calcularResumenSemanal(): { calorias: number, proteinas: number, grasas: number, hidratos: number } {
    const resumen = { calorias: 0, proteinas: 0, grasas: 0, hidratos: 0 };
    for (const franja of this.franjas) {
      for (const dia of this.dias) {
        const comidas = this.planificacion[franja][dia];
        for (const comida of comidas) {
          for (const ing of comida.ingredientes) {
            const factor = ing.gramos / 100;
            resumen.calorias += ing.caloriasPor100g * factor;
            resumen.proteinas += ing.proteinas * factor;
            resumen.grasas += ing.grasas * factor;
            resumen.hidratos += ing.hidratos * factor;
          }
        }
      }
    }
    return {
      calorias: Math.round(resumen.calorias),
      proteinas: Math.round(resumen.proteinas),
      grasas: Math.round(resumen.grasas),
      hidratos: Math.round(resumen.hidratos)
    };
  }

  calcularResumenPorDia(dia: string): void {
    const resumen = { calorias: 0, proteinas: 0, grasas: 0, hidratos: 0 };
    for (const franja of this.franjas) {
      const comidas = this.planificacion[franja][dia];
      for (const comida of comidas) {
        for (const ing of comida.ingredientes) {
          const factor = ing.gramos / 100;
          resumen.calorias += ing.caloriasPor100g * factor;
          resumen.proteinas += ing.proteinas * factor;
          resumen.grasas += ing.grasas * factor;
          resumen.hidratos += ing.hidratos * factor;
        }
      }
    }
    this.resumenPorDia[dia] = {
      calorias: Math.round(resumen.calorias),
      proteinas: Math.round(resumen.proteinas),
      grasas: Math.round(resumen.grasas),
      hidratos: Math.round(resumen.hidratos)
    };
    this.mostrarResumenDia[dia] = !this.mostrarResumenDia[dia];
  }

  obtenerLunesDesdeFecha(fecha: string): string {
    const date = new Date(fecha);
    const dia = date.getDay();
    const diff = date.getDate() - dia + (dia === 0 ? -6 : 1);
    const lunes = new Date(date.setDate(diff));
    return lunes.toISOString().split('T')[0];
  }

  async cambiarSemana(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const fechaSeleccionada = input?.value;
    if (!fechaSeleccionada) return;
    const lunesSemana = this.obtenerLunesDesdeFecha(fechaSeleccionada);
    this.fechaSemana = lunesSemana;
    this.mostrarResumenDia = {};
    const todas = await this.planificacionService.getPlanificacion(this.fechaSemana);
    this.planificacion = todas || this.crearPlanificacionVacia();
    this.actualizarCeldasIds();
  }

  async cambiarSemanaDesdeHistorial(semana: string): Promise<void> {
    this.fechaSemana = semana;
    const todas = await this.planificacionService.getPlanificacion(this.fechaSemana);
    this.planificacion = todas || this.crearPlanificacionVacia();
    this.mostrarResumenDia = {};
    this.actualizarCeldasIds();
  }

  async ejecutarDuplicado(): Promise<void> {
    if (!this.fechaDuplicar) return;
    const lunesDestino = this.obtenerLunesDesdeFecha(this.fechaDuplicar);
    const existente = await this.planificacionService.getPlanificacion(lunesDestino);
    if (existente) {
      const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
        data: {
          mensaje: `Ya existe una semana para el ${lunesDestino}. ¿Deseas sobrescribirla?`
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result === true) {
          await this.planificacionService.setPlanificacion(lunesDestino, this.planificacion);
          await this.actualizarSemanasGuardadas();
          this.mostrarDuplicador = false;
          this.fechaDuplicar = '';
        }
      });
      return;
    }
    await this.planificacionService.setPlanificacion(lunesDestino, this.planificacion);
    this.mostrarDuplicador = false;
    this.fechaDuplicar = '';
    await this.actualizarSemanasGuardadas();
  }

  async eliminarSemana(semana: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que quieres eliminar la semana ${semana}?`
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) {
        await this.planificacionService.eliminarPlanificacion(semana);
        await this.actualizarSemanasGuardadas();
      }
    });
  }

  crearPlanificacionVaciaInicial(): void {
    this.franjas.forEach(franja => {
      this.planificacion[franja] = {};
      this.dias.forEach(dia => {
        this.planificacion[franja][dia] = [];
      });
    });
  }

  crearPlanificacionVacia(): { [franja: string]: { [dia: string]: Comida[] } } {
    const nueva: { [franja: string]: { [dia: string]: Comida[] } } = {};
    this.franjas.forEach(franja => {
      nueva[franja] = {};
      this.dias.forEach(dia => {
        nueva[franja][dia] = [];
      });
    });
    return nueva;
  }

  actualizarCeldasIds(): void {
    this.celdasIds = [];
    this.franjas.forEach(franja => {
      this.dias.forEach(dia => {
        this.celdasIds.push(`celda-${dia}-${franja}`);
      });
    });
  }

  guardarPlanificacion(): void {
    const userId = this.auth.getUserId();
    if (!userId) return;
  
    this.planificacionService.guardarPlanificacion(userId, this.fechaSemana, this.planificacion)
      .then(() => {
        console.log('✅ Planificación guardada');
        this.actualizarSemanasGuardadas(); // 🔁 Aquí actualizas el historial tras guardar
        this.mostrarMensajeTemporal("¡Semana guardada exitosamente!")
      })
      .catch(error => console.error('❌ Error al guardar planificación:', error));
  }
  

  async actualizarSemanasGuardadas(): Promise<void> {
    this.semanasGuardadas = await this.planificacionService.getSemanasGuardadas();
  }

  duplicarDesdeHistorial(origen: string): void {
    this.origenADuplicar = origen;
    this.fechaDestinoDuplicado = '';
    this.mostrarModalDuplicado = true;
  }
  iniciarTutorialSiEsPrimeraVez() {
    const yaVisto = localStorage.getItem('tourPlanificador');
    console.log('¿Ya se vio el tutorial?', yaVisto);
  
    if (!yaVisto) {
      console.log('Lanzando tutorial Joyride...');
      this.joyrideService.startTour({
        steps: ['comidasDisponibles', 'tablaPlanificacion', 'accionesPlanificador', 'resumenSemanal'],
        stepDefaultPosition: 'bottom',
        showCounter: true,
        showPrevButton: true
      });
      localStorage.setItem('tourPlanificador', 'visto');
    }
  }
  forzarTour() {
    this.joyrideService.startTour({
      steps: ['comidasDisponibles', 'tablaPlanificacion', 'accionesPlanificador', 'resumenSemanal'],
      stepDefaultPosition: 'bottom',
      showCounter: true,
      showPrevButton: true
    });
  }
  volver() {
    this.router.navigate(['/']);
  }
}

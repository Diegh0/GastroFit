// src/app/pages/ia/ia.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSelectModule
} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

//import { MealPlanService, MealPlanResponse } from 'src/app/services/meal-plan.service';
//import { IaService, MealPlanResponse } from './ia.service';
import { ActivityLevel } from 'src/app/core/models/activity-level';
import { Objective, calculateDailyCalories } from 'src/app/core/utils/calorie-calculator';
import { MealPlanResponse, MealPlanService } from 'src/app/core/services/meal-plan.service';
import { IaService } from './ia.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule }      from '@angular/material/list';
import { MatIconModule }   from '@angular/material/icon';
import { IaHistoryService } from 'src/app/core/services/ia-history.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule 
  ],
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.scss']
})
export class IaComponent {
  form: FormGroup;
  caloriasRecomendadas: number | null = null;
  menu: MealPlanResponse['menu'] | null = null;
  cargando = false;
  // ia.component.ts
readonly daysOfWeek = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
readonly mealTypes  = ['Desayuno','Almuerzo','Merienda','Cena'] as const;

  error: string | null = null;

  nivelesActividad = [
    { label: 'Sedentario',   value: 'sedentario' },
    { label: 'Ligera',       value: 'ligera'     },
    { label: 'Moderada',     value: 'moderada'   },
    { label: 'Intensa',      value: 'intensa'    },
    { label: 'Muy intensa',  value: 'muy_intensa'}
  ] as { label: string; value: ActivityLevel }[];

  objetivos = [
    { label: 'Definición',    value: 'definicion'   },
    { label: 'Mantenimiento', value: 'mantenimiento'},
    { label: 'Volumen',       value: 'volumen'      }
  ] as { label: string; value: Objective }[];

  constructor(private fb: FormBuilder, private mealPlan: MealPlanService,private iaService: IaHistoryService,private snackBar: MatSnackBar)  {
    this.form = this.fb.group({
      peso:           [null, [Validators.required, Validators.min(30)]],
      altura:         [null, [Validators.required, Validators.min(100)]],
      edad:           [null, [Validators.required, Validators.min(10)]],
      sexo:           ['M', Validators.required],
      nivelActividad: ['moderada', Validators.required],
      objetivo:       ['mantenimiento', Validators.required],
      restricciones:  ['']
    });

    this.form.valueChanges.subscribe(vals => {
      this.menu = null;
      if (this.form.valid) {
        this.caloriasRecomendadas = calculateDailyCalories(vals);
      } else {
        this.caloriasRecomendadas = null;
      }
    });
  }

  async onSubmit() {
    if (!this.form.valid) return;
    this.error = null;
    this.menu = null;
    this.cargando = true;

    try {
      const params = this.form.value;
      const res = await this.mealPlan.generateMenu(params);
      this.menu = res?.menu ?? null;

    } catch (e: any) {
      console.error(e);
      this.error = e.message || 'Error generando el menú';
    } finally {
      this.cargando = false;
    }
  }
  onAddToIaHistory(receta: { nombre: string; id: string }, dia: string, tipo: 'Desayuno' | 'Almuerzo' | 'Merienda' | 'Cena') {
    const recetaCompleta = this.menu?.[dia]?.[tipo];
    if (!recetaCompleta) return;
  
    this.iaService.addIaEntry({
      dia,
      tipo,
      recipeId: receta.id,
      nombre: receta.nombre,
      favorita: false,
      imagenUrl: 'assets/imgPredeterminadaCars.png',
      ingredientes: recetaCompleta.ingredientes.map(ing => ({
        nombre: ing.nombre,
        gramos: ing.gramos,
        caloriasPor100g: ing.caloriasPor100g,
        proteinas: ing.proteinas,
        grasas: ing.grasas,
        hidratos: ing.hidratos
      }))      
      
    }).then(() => {
      this.snackBar.open('✅ Comida guardada en tu historial', 'Cerrar', {
        duration: 3000,
        panelClass: 'custom-snackbar-success' // 👈 estilo verde bonito
      });
    })
    .catch(err => {
      console.error('Error al guardar en iaHistory:', err);
      this.snackBar.open('❌ Error al guardar la comida', 'Cerrar', {
        duration: 3000,
        panelClass: 'custom-snackbar-error' // 👈 si aplicas también estilo de error
      });
    });
    
  }
  
  
  
  
}

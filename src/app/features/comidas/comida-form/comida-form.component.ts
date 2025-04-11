import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comida } from 'src/app/core/models/comida.model';

@Component({
  selector: 'app-comida-form',
  templateUrl: './comida-form.component.html',
  styleUrls: ['./comida-form.component.scss'],
  standalone: false
})
export class ComidaFormComponent {
  form: FormGroup;
  imagenPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      imagenUrl: [''],
      ingredientes: this.fb.array([
        this.crearIngredienteForm()
      ])
    });
  }

  get ingredientes(): FormArray {
    return this.form.get('ingredientes') as FormArray;
  }

  crearIngredienteForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      gramos: [0, [Validators.required, Validators.min(1)]],
      caloriasPor100g: [0, [Validators.required, Validators.min(0)]],
      proteinas: [0, [Validators.required, Validators.min(0)]],
      grasas: [0, [Validators.required, Validators.min(0)]],
      hidratos: [0, [Validators.required, Validators.min(0)]]
    });
  }

  agregarIngrediente(): void {
    this.ingredientes.push(this.crearIngredienteForm());
  }

  eliminarIngrediente(index: number): void {
    this.ingredientes.removeAt(index);
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const archivo = input.files[0];
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenPreview = lector.result as string;
        this.form.patchValue({ imagenUrl: lector.result });
      };
      lector.readAsDataURL(archivo);
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const nuevaComida: Comida = {
      nombre: this.form.value.nombre,
      ingredientes: this.form.value.ingredientes,
      imagenUrl: this.form.value.imagenUrl,
      favorita: false,
      fechaCreacion: new Date()
    };

    
  }
}

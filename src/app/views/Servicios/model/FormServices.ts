import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ServicesFormModel {
  formServices(): FormGroup {
    return new FormGroup({
      name: new FormControl(null,[Validators.required]),
      codigo: new FormControl(null,[Validators.required]),
      tipoServicio: new FormControl(null,[Validators.required]),
      estado: new FormControl('activo',[Validators.required]),
      categoria: new FormControl(null,[Validators.required]),
      destino: new FormControl(null,[Validators.required]),
      precio_adulto: new FormControl(null,[Validators.required]),
      precio_nino: new FormControl(null,[Validators.required]),
      hora_inicio: new FormControl(null,[Validators.required]),
      duracion: new FormControl(null,[Validators.required]),
      lugar: new FormControl(null,[Validators.required]),
      descripcion: new FormControl(),
      galeria: new FormControl(),
      salida_horarios: new FormControl(),
      recomendaciones: new FormControl(),
    });
  }
}

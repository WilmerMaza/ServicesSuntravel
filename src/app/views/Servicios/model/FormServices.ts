import { FormControl, FormGroup } from '@angular/forms';

export class ServicesFormModel {
  formServices(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      codigo: new FormControl(),
      tipoServicio: new FormControl(),
      estado: new FormControl(),
      categoria: new FormControl(),
      destino: new FormControl(),
      precio_adulto: new FormControl(),
      precio_nino: new FormControl(),
      hora_inicio: new FormControl(),
      duracion: new FormControl(),
      lugar: new FormControl(),
      descripcion: new FormControl(),
      galeria: new FormControl(),
      salida_horarios: new FormControl(),
      recomendaciones: new FormControl(),
    });
  }
}

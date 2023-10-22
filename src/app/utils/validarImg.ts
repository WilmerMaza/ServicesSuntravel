import { AbstractControl } from '@angular/forms';

function validateImages(control: AbstractControl) {
  const files: File[] = control.value;
  let totalSize = 0;

  if (files) {
    // Verificar que haya al menos 6 imágenes
    if (files.length < 6) {
      return { insufficientImages: true };
    }

    // Verificar el tamaño total de las imágenes
    for (const file of files) {
      totalSize += file.size;
    }

    if (totalSize > 2 * 1024 * 1024) { // 2 MB en bytes
      return { oversizedImages: true };
    }
  }

  return null;
}

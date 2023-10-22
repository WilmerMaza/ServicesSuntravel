import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { Validators } from 'src/app/utils/Validators';
import { Toast } from 'src/app/utils/alert_Toast';
import { ServicesFormModel } from '../../model/FormServices';
import {
  categoria,
  destino,
  file,
  services,
  tservicios,
} from '../../model/categoriaModel';
import { ServicesSunService } from '../../service/ServicesSun.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, OnDestroy {
  public serviceForm: FormGroup = new ServicesFormModel().formServices();
  public categorias: categoria[] = [];
  public tServicios: tservicios[] = [];
  public destino: destino[] = [];
  public isUpdate: boolean = false;
  private servicesId: string = '';
  public selectedFiles: File[] = [];
  public selectedFilesView: file[] = [];
  private selectedFilesDelete: string[] = [];
  private fileDelete: string[] = [];

  public salida_horariosEditor: Editor;
  public salida_horarios = '';
  public isSalida_horarios = false;

  public recomendacionesEditor: Editor;
  public recomendaciones = '';
  public isRecomendaciones = false;

  public informacion_AdicionalEditor: Editor;
  public informacion_Adicional = '';
  public isInformacion_Adicional = false;

  public terminos_condicionesEditor: Editor;
  public terminos_condiciones = '';
  public isTerminos_condiciones = false;

  public incluyeEditor: Editor;
  public incluye = '';
  public isIncluye = false;

  public no_incluyeEditor: Editor;
  public no_incluye = '';
  public isNo_incluye = false;

  constructor(
    private servicesSunService: ServicesSunService,
    private router: Router,
    private routeActive: ActivatedRoute,
  ) {
    this.routeActive.queryParams.subscribe((params) => {
      if (!Validators.isNullOrUndefined(params['id'])) {
        this.isUpdate = true;
        this.servicesId = params['id'];
      }

    });
  }

  ngOnInit(): void {

    if (!this.isUpdate) {
      this.initData();
    } else {
      this.dataUpdate(this.servicesId);
    }
    this.salida_horariosEditor = new Editor();
    this.recomendacionesEditor = new Editor();
    this.informacion_AdicionalEditor = new Editor();
    this.no_incluyeEditor = new Editor();
    this.terminos_condicionesEditor = new Editor();
    this.incluyeEditor = new Editor();
  }
  ngOnDestroy(): void {
    this.salida_horariosEditor.destroy();
    this.recomendacionesEditor.destroy();
    this.informacion_AdicionalEditor.destroy();
    this.no_incluyeEditor.destroy();
    this.terminos_condicionesEditor.destroy();
    this.incluyeEditor.destroy();
  }

  onFilesSelected(event: any): void {
    const {
      target: { files },
    } = event;

    if (files.length > 0) {
      const arrayFiles: File[] = Array.from(files); // Convierte el objeto FileList en un arreglo de tipo File
      arrayFiles.forEach((file: File) => {
        this.selectedFiles.push(file);

        const fileName = {
          type: file.type,
          name: file.name,
        };
        this.selectedFilesView.push(fileName);
      });
    }
  }






  removeImg(data: any): void {
    this.selectedFilesView = this.selectedFilesView.filter(
      (item) => item.name !== data.name
    );

    this.selectedFiles = this.selectedFiles.filter(
      (item) => item.name !== data.name
    );

    const file = this.selectedFilesDelete.find((item) => item === data.name);
    if (!Validators.isNullOrUndefined(file)) {
      this.fileDelete.push(file);
    }
  }
  dataUpdate(servicioID: string) {
    if (!Validators.isNullOrUndefined(servicioID)) {
      this.initData();

      const data = {
        servicioID,
      };

      this.servicesSunService
        .getFindServices(data)
        .subscribe((res: services) => {
          const { galeria, tservicioId, categoriaId, destinoId } = res;
          if (!Validators.isNullOrUndefined(galeria)) {
            const galeriaSplit = galeria.split(',');
            galeriaSplit.forEach((img) => {
              const fileExtension = img.substring(
                img.lastIndexOf('.')
              ) as keyof typeof contentTypeMap;

              const contentTypeMap = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp', // Agrega la extensión .webp y su tipo de contenido
                // Agrega aquí otros formatos si los necesitas
              };

              this.selectedFilesView.push({
                type: contentTypeMap[fileExtension],
                name: img,
              });

              this.selectedFilesDelete.push(img);
            });
          }
          this.atributos(tservicioId);
          this.serviceForm.patchValue({
            ...res,
            tipoServicio: tservicioId,
            categoria: categoriaId,
            destino: destinoId,
            galeria: null,
          });
        });
    }
  }

  initData(): void {
    this.servicesSunService
      .getCategorias()
      .subscribe((res: categoria[]) => (this.categorias = res));

    this.servicesSunService
      .getTservicio()
      .subscribe((res: tservicios[]) => (this.tServicios = res));

    this.servicesSunService
      .getDestino()
      .subscribe((res: destino[]) => (this.destino = res));
  }

  saveServices(): void {
    this.serviceForm.markAllAsTouched();

    if (!this.selectedFiles.length) {
      this.serviceForm.get('galeria')?.setErrors({ required: true });
      return;
    }

    if (this.selectedFiles.length < 6) {
      this.serviceForm.get('galeria')?.setErrors({ minImages: true });
      return;
    }

    const totalSize = this.selectedFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 2 * 1024 * 1024) {
      this.serviceForm.get('galeria')?.setErrors({ maxFileSize: true });
      return;
    }

    if (!this.selectedFilesView.length) {
      // Si no se seleccionó ninguna imagen, muestra un mensaje de error
      this.serviceForm.get('galeria')?.setErrors({ required: true });
      return;
    }
    if (!this.serviceForm.valid) {
      return;
    }

    const request = {
      ...this.serviceForm.value,
      galeria: this.selectedFilesView
        .map((item) => {
          return item.name;
        })
        .toString(),
    };

    const formData = new FormData();

    // Agrega las imágenes al objeto formData
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('file', this.selectedFiles[i]);
    }

    this.servicesSunService.saveService(request).subscribe(
      (res) => {
        this.servicesSunService.subirImg(formData).subscribe(
          (res) => {
            this.serviceForm.reset();
            this.selectedFiles.pop();
            this.selectedFilesView.pop();
            this.selectedFilesView = []
            Toast.fire({
              icon: 'success',
              title: res.msg,
            });
          },
          (loginError: Error) => {
            Toast.fire({
              icon: 'error',
              title: 'Error al cargar imágenes',
            });
          }
        );
      },
      (loginError: Error) => {
        Toast.fire({
          icon: 'error',
          title: 'Error al crear Servicio',
        });
      }
    );
  }

  updateServices(): void {
    if (!this.selectedFilesView.length) {
      // Si no se seleccionó ninguna imagen, muestra un mensaje de error
      this.serviceForm.get('galeria')?.setErrors({ required: true });
      return;
    }

    if (!this.serviceForm.valid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    // Agrega las imágenes al objeto formData
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('file', this.selectedFiles[i]);
    }
    const data = {
      ...this.serviceForm.value,
      id: this.servicesId,
      galeria: this.selectedFilesView
        .map((item) => {
          return item.name;
        })
        .toString(),
      galeriaDelete: this.fileDelete.toString(),
    };

    this.servicesSunService.updateServices(data).subscribe(
      () => {
        this.serviceForm.reset();
        this.selectedFiles.pop();
        this.selectedFilesView.pop();
        this.back();
        this.servicesSunService.subirImg(formData).subscribe(
          (res) => {
            Toast.fire({
              icon: 'success',
              title: res.msg,
            });
          },
          (loginError: Error) => {
            Toast.fire({
              icon: 'error',
              title: 'Error al cargar imágenes',
            });
          }
        );
      },
      (loginError: Error) => {
        Toast.fire({
          icon: 'error',
          title: 'Error al crear Servicio',
        });
      }
    );
  }

  back(): void {
    this.router.navigate(['/servicios']);
  }

  atributos(idServicio: string) {
    const isAtributos = this.tServicios.find((item) => item.ID === idServicio);
    if (isAtributos) {
      isAtributos.AtributosDescribe.forEach((item) => {
        const {
          Atributo: { name },
          estado,
        } = item;

        this.isSalida_horarios =
          name === 'Salida y horarios' ? estado : this.isSalida_horarios;
        this.isRecomendaciones =
          name === 'Recomendaciones' ? estado : this.isRecomendaciones;
        this.isInformacion_Adicional =
          name === 'Informacion Adicional'
            ? estado
            : this.isInformacion_Adicional;
        this.isTerminos_condiciones =
          name === 'Terminos y condiciones'
            ? estado
            : this.isTerminos_condiciones;
        this.isIncluye = name === 'Incluye' ? estado : this.isIncluye;
        this.isNo_incluye = name === 'No incluye' ? estado : this.isNo_incluye;
      });
    }
  }
}

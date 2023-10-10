import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServicesFormModel } from '../../model/FormServices';
import { ServicesSunService } from '../../service/ServicesSun.service';
import { Toast } from 'src/app/utils/alert_Toast';
import {
  categoria,
  destino,
  file,
  services,
  tservicios,
} from '../../model/categoriaModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'src/app/utils/Validators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
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

  constructor(
    private servicesSunService: ServicesSunService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.routeActive.queryParams.subscribe((params) => {
      this.dataUpdate(params['id']);
    });
  }

  ngOnInit(): void {
    this.initData();
  }

  onFilesSelected(event: any): void {
    console.log(event);

    const {
      target: {
        files,
        files: [{ name, type }],
      },
    } = event;
    const file = {
      type,
      name,
    };

    this.selectedFilesView.push(file);
    this.selectedFiles.push(files[0]);
  }

  removeImg(data: any): void {
    console.log(data);

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
      this.isUpdate = true;
      this.servicesId = servicioID;
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
        this.serviceForm.reset();
        this.selectedFiles.pop();
        this.selectedFilesView.pop();
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

  updateServices(): void {
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
}

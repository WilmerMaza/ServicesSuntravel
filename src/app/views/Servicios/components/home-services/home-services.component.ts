import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServicesSunService } from '../../service/ServicesSun.service';
import { services } from '../../model/categoriaModel';
import { Toast } from 'src/app/utils/alert_Toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.scss'],
})
export class HomeServicesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public servicios: services[] = [];
  public columnas: string[] = [
    'codigo',
    'tipoServicio',
    'name',
    'estado',
    'acciones',
  ];
  public dataSource: MatTableDataSource<services>;
  public imageUrl: string = '';

  constructor(
    private servicesSunService: ServicesSunService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initData(): void {
    this.servicesSunService.getServices().subscribe((res: services[]) => {
      this.servicios = res;
      this.dataSource = new MatTableDataSource(this.servicios);
      this.dataSource.paginator = this.paginator; // Asigna el paginador después de cargar los datos
    });

    //example de api img

    // this.servicesSunService.getImg("Frame 3.png").subscribe((data) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       this.imageUrl = reader.result as string;
    //   // Agrega esto para verificar la URL
    //     };
    //     reader.readAsDataURL(data);
    //   });
  }

  editarPersona({ ID }: services) {
    this.router.navigate(['/servicios/save'], { queryParams: { id: ID } });
  }

  crearServices(): void {
    this.router.navigate(['/servicios/save']);
  }

  // Función para eliminar una persona
  eliminarPersona({ ID }: services) {
    this.servicesSunService.deleteServices(ID).subscribe(
      (res) => {
        Toast.fire({
          icon: 'success',
          title: res.msg,
        });
        this.initData();
      },
      (loginError: Error) => {
        Toast.fire({
          icon: 'error',
          title: 'Eliminar Servicio',
        });
      }
    );
  }
}

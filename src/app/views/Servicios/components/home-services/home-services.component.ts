import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Toast } from 'src/app/utils/alert_Toast';
import { services } from '../../model/categoriaModel';
import { ServicesSunService } from '../../service/ServicesSun.service';

@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.scss'],
})
export class HomeServicesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public servicios: services[] = [];
  public columnas: string[] = [
    'codigo',
    'tipoServicio',
    'name',
    'estado',
    'acciones',
  ];
  showSpinner = true;
  public dataSource: MatTableDataSource<services>;
  public imageUrl: string = '';

  constructor(
    private servicesSunService: ServicesSunService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.initData();
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  initData(): void {
    this.servicesSunService.getServices().subscribe((res: services[]) => {
      this.servicios = res;
      this.dataSource = new MatTableDataSource(this.servicios);
      this.dataSource.paginator = this.paginator;
    });
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

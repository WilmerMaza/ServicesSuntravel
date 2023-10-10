import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuntravelApiService } from 'src/app/services/suntravel-api.service';
import {
  categoria,
  destino,
  services,
  tservicios,
} from '../model/categoriaModel';
import { IHttpModel } from 'src/app/models/IHttp.Model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicesSunService {
  constructor(private suntravelApiService$: SuntravelApiService) {}

  saveService(service: any): Observable<any> {
    const endpoin = `/servicios/createService`;
    return this.suntravelApiService$.post(endpoin, service);
  }

  getCategorias(): Observable<Array<categoria>> {
    const endpoin = `/categoria/getCategorias`;
    return this.suntravelApiService$.get(endpoin);
  }

  getTservicio(): Observable<Array<tservicios>> {
    const endpoin = `/TipoServicios/getTservicios`;
    return this.suntravelApiService$.get(endpoin);
  }

  getDestino(): Observable<Array<destino>> {
    const endpoin = `/destinos/getDestinos`;
    return this.suntravelApiService$.get(endpoin);
  }

  getServices(): Observable<Array<services>> {
    const endpoin = `/servicios/getServicice`;
    return this.suntravelApiService$.get(endpoin);
  }

  getFindServices(data: any): Observable<services> {
    const endpoin = `/servicios/getfindServicice`;
    return this.suntravelApiService$.post(endpoin, data);
  }

  updateServices(data: any): Observable<any> {
    const endpoin = `/servicios/actualizar`;
    return this.suntravelApiService$.put(endpoin, data);
  }

  deleteServices(id: string): Observable<any> {
    const endpoin = `/servicios/delete/${id}`;
    return this.suntravelApiService$.delete(endpoin);
  }

  getImg(name: String): Observable<any> {
    const solicitud: IHttpModel = {
      url: `/subirImagen/lower/${name}`, // Reemplaza con la ruta del archivo que deseas descargar
      method: 'GET', // Opcional, ya que GET es el método por defecto
      options: {
        responseType: 'blob', // Especificamos 'blob' como el tipo de respuesta
      },
    };

    return this.suntravelApiService$.generic(solicitud);
  }

  subirImg(files: FormData): Observable<any> {
    const headers = new HttpHeaders();
    const solicitud: IHttpModel = {
      url: `/subirImagen/upload`, // Reemplaza con la ruta del archivo que deseas descargar
      method: 'POST', // Opcional, ya que GET es el método por defecto
      options: {
        responseType: 'json', // Especificamos 'blob' como el tipo de respuesta
        body: files,
        headers: headers,
      },
    };

    return this.suntravelApiService$.generic(solicitud);
  }
}

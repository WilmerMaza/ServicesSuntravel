import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuntravelApiService } from 'src/app/services/suntravel-api.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesSunService {

constructor( private suntravelApiService$:SuntravelApiService) { }



saveService(service:any):Observable<any>{
  const endpoin = `/servicios/createService`
  return this.suntravelApiService$.post(endpoin,service);
}

}

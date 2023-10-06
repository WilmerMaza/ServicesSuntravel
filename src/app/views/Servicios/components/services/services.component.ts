import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServicesFormModel } from '../../model/FormServices';
import { ServicesSunService } from '../../service/ServicesSun.service';
import { Toast } from 'src/app/utils/alert_Toast';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  public serviceForm: FormGroup = new ServicesFormModel().formServices();
  constructor(private servicesSunService: ServicesSunService) {}

  ngOnInit() {}

  saveServices(): void {
    if (!this.serviceForm.valid) {
      return;
    }

    this.servicesSunService.saveService(this.serviceForm.value).subscribe(
      (res) => {
        Toast.fire({
          icon: 'success',
          title: res.msg
        })
      },
      (loginError: Error) => {
        Toast.fire({
          icon: 'error',
          title: 'Error al crear Servicio',
        });
      }
    );
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './components/SaveServices/services.component';
import { HomeServicesComponent } from './components/home-services/home-services.component';


const routes: Routes = [
  {
    path: '',
    component: HomeServicesComponent,
    data: {
      title: $localize`Servicios`
    }
  },{
    path: 'save',
    component: ServicesComponent,
    data: {
      title: $localize`Servicios`
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgxEditorModule } from 'ngx-editor';
import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServicesComponent } from './components/SaveServices/services.component';
import { HomeServicesComponent } from './components/home-services/home-services.component';
import { ServiciosRoutingModule } from './servicios-routing.module';

@NgModule({
  imports: [
    ServiciosRoutingModule,
    CommonModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxEditorModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
  ],
  providers: [provideEnvironmentNgxMask()],
  declarations: [ServicesComponent, HomeServicesComponent],
  exports: [HomeServicesComponent],
})
export class ServiciosdModule {}

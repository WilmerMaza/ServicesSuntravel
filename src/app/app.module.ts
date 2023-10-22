import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/infraestructure/modules/material/material.module';
// Import routing module
import { AppRoutingModule } from './app-routing.module';
// Import app component
import { AppComponent } from './app.component';
// Import containers
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { NgxEditorModule } from 'ngx-editor';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { LocalStorageService } from 'ngx-webstorage';
import { DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import { PagesModule } from './views/pages/pages.module';
const APP_CONTAINERS = [DefaultHeaderComponent, DefaultLayoutComponent];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, ],
  providers: [
    LocalStorageService,
    provideNgxMask(),
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxEditorModule,
    MatProgressSpinnerModule

  ],
})
export class AppModule {}

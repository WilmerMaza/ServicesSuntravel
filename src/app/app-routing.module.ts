import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { JwtGuard } from './infraestructure/guard/JwtGuard';
import { IgnoreLoginGuard } from './infraestructure/guard/ignoreLoginGuard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IgnoreLoginGuard],
    data: {
      title: 'Login Page',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate:[JwtGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./views/Servicios/servicios.module').then(
            (m) => m.ServiciosdModule
          ),
      },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

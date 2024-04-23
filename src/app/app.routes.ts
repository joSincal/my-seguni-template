import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'init' },
  {
    path: 'init',
    data: {
      breadcrumb: {
        label: 'Inicio',
        info: 'bx-home-alt',
      },
    },
    loadComponent: () => import('./modules/init/init.component'),
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./component/home-component/home-component').then(m => m.HomeComponent) }, // Lazy
  //{ path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)}
];

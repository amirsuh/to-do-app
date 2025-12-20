import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./component/home-component/home-component').then((m) => m.HomeComponent),
  }, // Lazy
  {
    path: 'helloworld',
    loadComponent: () =>
      import('./component/helloworld/helloworld').then((m) => m.Helloworld),
  },
  {
    path: 'counter',
    loadComponent: () =>
      import('./component/counter/counter').then((m) => m.Counter),
  },
  {
    path: 'apibind',
    loadComponent: () =>
      import('./component/api-bind/api-bind').then((m) => m.ApiBind),
  },
{
    path: 'behvssignal',
    loadComponent: () =>
      import('./component/beh-vs-signal/beh-vs-signal').then((m) => m.BehVsSignal),
  },
];

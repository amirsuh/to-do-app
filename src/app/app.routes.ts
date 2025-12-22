import { Routes } from '@angular/router';
import { ROUTE_CONSTANTS } from './core/constants/route-constants';
import { MaterilaDesigns } from './shared/components/materila-designs/materila-designs';
async function loadrouteComponent() {
  // return import('./features/routing/routing').then((m) => m.Routing);
  const c = await import('./features/routing/routing');
  return c.Routing;

}
export const routes: Routes = [
  // Default redirect from '' to HOME
  { path: '', redirectTo: ROUTE_CONSTANTS.HOME, pathMatch: 'full' },

  // RXJSANDOBSERVABLES route
  {
    path: ROUTE_CONSTANTS.RXJSANDOBSERVABLES,
    loadComponent: () =>
      import('./features/rxjsandobservables/rxjsandobservables').then((m) => m.Rxjsandobservables),
  },

  // Home route
  {
    path: ROUTE_CONSTANTS.HOME,
    loadComponent: () =>
      import('./features/dashboard/component/dashboard/dashboard').then((m) => m.Dashboard),
  },

  // StaetManagement route
  {
    path: ROUTE_CONSTANTS.STATEMANAGEMNETANDNGRS,
    loadComponent: () =>
      import('./features/statemanagement/statemanagement').then((m) => m.Statemanagement),
  },

  // Forms route
  {
    path: ROUTE_CONSTANTS.FORMS,
    loadComponent() {
      return import('./features/forms/forms').then((c) => c.Forms);
    },
  },

  // routing route
  {
    path: ROUTE_CONSTANTS.ROUTING,
    loadComponent:loadrouteComponent
  },

  { path: ROUTE_CONSTANTS.ANGULARMATERIAL, component: MaterilaDesigns },

  // Wildcard route for 404 page
  { path: '**', loadComponent:()=>import('./shared/components/materila-designs/materila-designs').then(c=>c.MaterilaDesigns) },

];


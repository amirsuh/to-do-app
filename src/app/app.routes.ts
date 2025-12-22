import { Routes } from '@angular/router';
import { ROUTE_CONSTANTS } from './core/constants/route-constants';
import { MaterilaDesigns } from './shared/components/materila-designs/materila-designs';
import { authguardGuard } from './core/guards/authguard-guard';
import { childAuthGuard } from './core/guards/childAuths/child-auth-guard';
import { canDeactivateForm } from './core/guards/deactivate/form-deactivate-guard';
import { Admin } from './features/routing/component/admin/admin';
import { adminLoadGuard } from './core/guards/canload/admin-load-guard';
import { Profile } from './features/routing/component/profile/profile';
import { userResolver } from './core/guards/user-resolver';
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
        canActivate: [authguardGuard],
    canActivateChild: [childAuthGuard],
  },

  // Forms route
  {
    path: ROUTE_CONSTANTS.FORMS,
    loadComponent() {
      return import('./features/forms/forms').then((c) => c.Forms);
    },

    canDeactivate: [canDeactivateForm]


  },

  // routing route
  {
    path: ROUTE_CONSTANTS.ROUTING,
    loadComponent:loadrouteComponent,data: { reuse: false },
  },

  { path: ROUTE_CONSTANTS.ANGULARMATERIAL, component: MaterilaDesigns,data: { reuse: true },},
  { path: ROUTE_CONSTANTS.ADMIN, component: Admin,data: { reuse: true },
    canMatch:[adminLoadGuard]
  },
  { path: ROUTE_CONSTANTS.PROFILE, component: Profile,resolve: { user: userResolver },data: { reuse: true },},

  // Wildcard route for 404 page
  { path: '**', loadComponent:()=>import('./shared/components/pagenotfoundcomponent/pagenotfoundcomponent').then(c=>c.Pagenotfoundcomponent) },

];


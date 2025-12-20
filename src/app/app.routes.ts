import { Routes } from '@angular/router';
import { ROUTE_CONSTANTS } from './core/constants/route-constants';
import { Pagenotfoundcomponent } from './shared/components/pagenotfoundcomponent/pagenotfoundcomponent';
import { Rxjsandobservables } from './features/rxjsandobservables/rxjsandobservables';
import { Dashboard } from './features/dashboard/component/dashboard/dashboard';

export const routes: Routes = [
  // Default redirect from '' to HOME
  { path: '', redirectTo: ROUTE_CONSTANTS.HOME, pathMatch: 'full' },

  // Home route
  { path: ROUTE_CONSTANTS.HOME, component: Dashboard },

  // RxJS and Observables route
  { path: ROUTE_CONSTANTS.RXJSANDOBSERVABLES, component: Rxjsandobservables },

  // Wildcard route for 404 page
  { path: '**', component: Pagenotfoundcomponent }

];

import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './state/todo-ngrx/todo.reducer';
import {  provideEffects } from '@ngrx/effects';
import { TodoEffects } from './state/todo-ngrx/todo.effect';
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { CustomReuseStrategy } from './core/services/customroutinstrategy/custom-reuse-strategy';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './core/interceptors/auth-interceptor-interceptor';
import { grocerReducer } from './features/ngrx/store/reducer/grocery.reducer';
import { bucketReducer } from './features/ngrx/store/reducer/bucket.reducer';
import { MoviesEffects } from './features/ngrx/store/effects/grocery.effect';
import { medgrosReducer } from './features/medicine-ngrx/store/reducer/medgroc.reducer';
import { medBuckerReducer } from './features/medicine-ngrx/store/reducer/medbucket.reducer';
import { MoviesEffects2 } from './features/medicine-ngrx/store/effects/medgros.effect';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),

    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    provideStore({gorcery:grocerReducer,myBucket:bucketReducer,medGrocery:medgrosReducer,medBucket:medBuckerReducer}),provideEffects(MoviesEffects,MoviesEffects2),provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    // provideRouter(routes,
    //   withPreloading(PreloadAllModules)
      // with modules
      // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

    // ),
    // provideStore({todos:todoReducer}),provideEffects([TodoEffects])
 // for NgRx

  ]
};

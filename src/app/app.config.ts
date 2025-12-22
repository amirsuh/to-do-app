import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './state/todo-ngrx/todo.reducer';
import {  provideEffects } from '@ngrx/effects';
import { TodoEffects } from './state/todo-ngrx/todo.effect';
import { CustomReuseStrategy } from './core/services/customroutinstrategy/custom-reuse-strategy';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './core/interceptors/auth-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),

    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    // provideRouter(routes,
    //   withPreloading(PreloadAllModules)
      // with modules
      // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

    // ),
    // provideStore({todos:todoReducer}),provideEffects([TodoEffects])
 // for NgRx

  ]
};

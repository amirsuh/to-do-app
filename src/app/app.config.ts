import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './state/todo-ngrx/todo.reducer';
import {  provideEffects } from '@ngrx/effects';
import { TodoEffects } from './state/todo-ngrx/todo.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      withPreloading(PreloadAllModules)
      // with modules
      // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

    ),
    // provideStore({todos:todoReducer}),provideEffects([TodoEffects])
 // for NgRx

  ]
};

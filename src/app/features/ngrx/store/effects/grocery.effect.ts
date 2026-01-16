import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { GroceryService } from '../../grocery.service';
import { groceryAction } from '../actions/grocery.action';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private groceryService = inject(GroceryService);

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(groceryAction.loadGroceris),
      switchMap(() =>
        this.groceryService.fetchAllGroceries().pipe(
          map((groceries:any) => (groceryAction.loadGroceriesSuccess({payload:groceries}))),
          catchError(() => of(groceryAction.loadGroceriesFailure()))
        )
      )
    );
  });
}

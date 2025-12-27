import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Medicinservice } from '../../medicinservice';
import { medGroceryAction } from '../actions/medgros.actions';

@Injectable()
export class MoviesEffects2 {
  private actions$ = inject(Actions);
  private moviesService = inject(Medicinservice);

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(medGroceryAction.loadMedGroceris),
      exhaustMap(() =>
        this.moviesService.fetchAllMedGroceries().pipe(
          map((medgroceries:any) => (medGroceryAction.loadMedGroceriesSuccess({payload:medgroceries}))),
          catchError(() => of(medGroceryAction.loadMedGroceriesFailure()))
        )
      )
    );
  });
}

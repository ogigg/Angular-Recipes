import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  loadAllRecipes,
  allRecipesLoaded,
  editRecipe,
} from './recipes.actions';
import { ApiService } from '../api.service';

@Injectable()
export class RecipesEffects {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllRecipes),
      concatMap((action) => this.recipesService.getAllRecipes()),
      map((recipes) => allRecipesLoaded({ recipes }))
    )
  );

  saveRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editRecipe),
        concatMap((action) =>
          this.recipesService.updateRecipe(
            action.update.changes,
            action.update.id
          )
        )
      ),
    { dispatch: false }
  );

  // logout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(logout),
  //       tap((action) => {
  //         localStorage.removeItem('user');
  //         this.router.navigateByUrl('/login');
  //       })
  //     ),
  //   { dispatch: false }
  // );

  constructor(
    private actions$: Actions,
    private router: Router,
    private recipesService: ApiService
  ) {}
}

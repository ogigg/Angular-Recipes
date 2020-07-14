import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, concatMap, withLatestFrom, filter } from 'rxjs/operators';

import {
  loadAllRecipes,
  allRecipesLoaded,
  editRecipe,
  deleteRecipe,
} from './recipes.actions';
import { ApiService } from '../api.service';
import { selectIsLoggedIn } from '../login/auth.selectors';

@Injectable()
export class RecipesEffects {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllRecipes),
      withLatestFrom(this.store.select(selectIsLoggedIn)),
      filter(([_, loaded]) => !loaded),
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
  deleteRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteRecipe),
        concatMap((action) =>
          this.recipesService.deleteRecipe(action.recipe.id)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private recipesService: ApiService
  ) {}
}

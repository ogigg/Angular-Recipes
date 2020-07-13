import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './recpes.reducers';
import * as fromRecipes from './recpes.reducers';
export const selectRecipesState = createFeatureSelector<RecipeState>('recipes');

export const selectAllRecipes = createSelector(
  selectRecipesState,
  fromRecipes.selectAll
);
// export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

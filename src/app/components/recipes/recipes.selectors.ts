import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './recpes.reducers';

export const selectAuthState = createFeatureSelector<RecipeState>('recipes');

export const selectRecipes = createSelector(
  selectAuthState,
  (recipes) => recipes.recipes
);
// export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

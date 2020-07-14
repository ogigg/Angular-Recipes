import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './recipes.reducers';
import { selector } from './recipes.reducers';

export const selectRecipesState = createFeatureSelector<RecipeState>('recipes');

export const selectAllRecipes = createSelector(
  selectRecipesState,
  selector.selectAll
);

export const selectRecipe = createSelector(
  selectRecipesState,
  (recipes, props) => recipes.entities[props.id]
);

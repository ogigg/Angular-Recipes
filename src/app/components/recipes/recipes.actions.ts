import { createAction, props } from '@ngrx/store';
import { Recipe } from '../models/recipe.model';
import { Update } from '@ngrx/entity';

export const createRecipe = createAction(
  '[Add Recipe Page] Create new recipe',
  props<{ recipe: Recipe }>()
);

export const editRecipe = createAction(
  '[Edit Recipe Page] Edit recipe',
  props<{ recipe: Update<Recipe> }>()
);

export const loadAllRecipes = createAction(
  '[Home Page] Load all recipes event'
  // props<{ recipes: Recipe[] }>()
);

export const allRecipesLoaded = createAction(
  '[Home Page] Load all recipes',
  props<{ recipes: Recipe[] }>()
);

export const clearRecipes = createAction('[Logout] Clear all recipes');

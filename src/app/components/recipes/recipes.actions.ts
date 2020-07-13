import { createAction, props } from '@ngrx/store';
import { Recipe } from '../models/recipe.model';
import { Update } from '@ngrx/entity';

export const loadAllRecipes = createAction(
  '[Home Page] Load all recipes event'
);

export const allRecipesLoaded = createAction(
  '[Home Page] Load all recipes',
  props<{ recipes: Recipe[] }>()
);

export const clearRecipes = createAction('[Logout] Clear all recipes');

export const editRecipe = createAction(
  '[Edit Page] Edit recipe',
  props<{ update: Update<Recipe> }>()
);

export const deleteRecipe = createAction(
  '[Recipe Page] Delete recipe',
  props<{ recipe: Recipe }>()
);

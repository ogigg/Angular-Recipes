import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { User } from '../models/user.model';
import {
  editRecipe,
  loadAllRecipes,
  allRecipesLoaded,
  clearRecipes,
  deleteRecipe,
} from './recipes.actions';
import { Recipe } from '../models/recipe.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface RecipeState extends EntityState<Recipe> {
  recipes: Recipe[];
}

export const adapter = createEntityAdapter<Recipe>();

export const initialRecipeState = adapter.getInitialState();

export const recipesReducer = createReducer(
  initialRecipeState,
  on(allRecipesLoaded, (state, action) =>
    adapter.addAll(action.recipes, state)
  ),

  on(deleteRecipe, (state, action) =>
    adapter.removeOne(action.recipe.id, state)
  ),

  on(clearRecipes, (state, action) => adapter.removeAll(state)),

  on(editRecipe, (state, action) => adapter.updateOne(action.update, state))
);

export const selector = adapter.getSelectors();
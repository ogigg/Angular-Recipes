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
import { createRecipe, editRecipe, loadAllRecipes } from './recipes.actions';
import { Recipe } from '../models/recipe.model';

export interface RecipeState {
  recipes: Recipe[];
}

export const initialRecipeState: RecipeState = {
  recipes: [],
};

export const recipesReducer = createReducer(
  initialRecipeState,

  on(createRecipe, (state, action) => {
    return {
      recipes: [],
    };
  }),

  on(editRecipe, (state, action) => {
    return {
      recipes: [],
    };
  }),
  on(loadAllRecipes, (state, action) => {
    return {
      recipes: action.recipes,
    };
  })
);

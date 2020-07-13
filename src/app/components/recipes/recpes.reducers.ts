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
  createRecipe,
  editRecipe,
  loadAllRecipes,
  allRecipesLoaded,
  clearRecipes,
} from './recipes.actions';
import { Recipe } from '../models/recipe.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface RecipeState extends EntityState<Recipe> {
  recipes: Recipe[];
}

export const adapter = createEntityAdapter<Recipe>();

export const initialRecipeState = adapter.getInitialState();
// export const initialRecipeState: RecipeState = {
//   recipes: [],
// };

export const recipesReducer = createReducer(
  initialRecipeState,
  on(allRecipesLoaded, (state, action) =>
    adapter.addAll(action.recipes, state)
  ),

  on(createRecipe, (state, action) => adapter.removeAll(state)),

  on(editRecipe, (state, action) => adapter.removeAll(state)),
  // on(loadAllRecipes, (state, action) => adapter.),

  on(clearRecipes, (state, action) => adapter.removeAll(state))
);

export const { selectAll } = adapter.getSelectors();

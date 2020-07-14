import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeEntityService extends EntityCollectionServiceBase<Recipe> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Recipes', serviceElementsFactory);
  }
}

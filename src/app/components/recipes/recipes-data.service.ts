import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipesDataService extends DefaultDataService<Recipe> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Recipes', http, httpUrlGenerator);
  }
}

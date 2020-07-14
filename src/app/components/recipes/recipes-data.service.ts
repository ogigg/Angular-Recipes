import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
const pageUrl = 'http://localhost:4000';
@Injectable()
export class RecipesDataService extends DefaultDataService<Recipe> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Recipes', http, httpUrlGenerator);
  }

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${pageUrl}/api/recipes`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<Recipe>(`${pageUrl}/api/recipes/${id}`);
  }

  update(update: Update<Recipe>): Observable<Recipe> {
    const data = new FormData();
    data.append('json', JSON.stringify(update.changes));
    return this.http.put<Recipe>(`${pageUrl}/api/recipes/${update.id}`, data);
  }
}

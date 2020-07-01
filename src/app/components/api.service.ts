import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './models/recipe.model';
import { Observable } from 'rxjs';

export const pageUrl = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${pageUrl}/api/recipes`);
  }

  getRecipe(id: Number): Observable<Recipe> {
    return this.http.get<Recipe>(`${pageUrl}/api/recipes/${id}`);
  }

  addRecipe(formData, image: File): Observable<Recipe> {
    const data = new FormData();
    data.append('json', JSON.stringify(formData));
    data.append('file', image);

    return this.http.post<Recipe>(`${pageUrl}/api/upload`, data);
  }

  deleteRecipe(id: Number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${pageUrl}/api/recipes/${id}`);
  }
}

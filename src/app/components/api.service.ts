import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Recipe } from './models/recipe.model';
import { HttpHeaders } from '@angular/common/http';

export const pageUrl = "http://localhost:4000";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllRecipes() {
    return this.http.get<Recipe[]>(`${pageUrl}/api/recipes`);
  }
  getRecipe(id: Number) {
    return this.http.get<Recipe>(`${pageUrl}/api/recipes/${id}`);
  }


  addRecipe(formData, image: File) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
      })
    };

    const data = new FormData()
    data.append('json', JSON.stringify(formData));
    data.append('file', image);
    console.log(data)

    return this.http.post(`${pageUrl}/api/upload`, data);

  }

  deleteRecipe(id: Number) {
    return this.http.delete(`${pageUrl}/api/recipes/${id}`);
  }
}

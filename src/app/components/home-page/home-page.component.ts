import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public recipes: Recipe[];
  constructor(private recipesService: ApiService) {
    this.recipes = [];
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  async getAllRecipes(): Promise<void> {
    this.recipes = await this.recipesService.getAllRecipes().toPromise();
  }
}

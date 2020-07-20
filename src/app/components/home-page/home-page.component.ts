import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { RecipeEntityService } from '../recipes/recipes-entity.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private recipeService: RecipeEntityService) {}
  private page: number = 1;
  private recipesPerPage: number = 5;
  public recipes: Recipe[];
  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.entities$.subscribe((recipes) => {
      this.recipes = recipes.slice(0, this.page * this.recipesPerPage);
    });
    this.page++;
  }
  onScroll() {
    this.getRecipes();
  }
}

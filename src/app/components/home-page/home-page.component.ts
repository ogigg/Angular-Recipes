import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Recipe } from '../models/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { loadAllRecipes } from '../recipes/recipes.actions';
import { Observable } from 'rxjs';
import { selectAllRecipes } from '../recipes/recipes.selectors';
import { RecipeEntityService } from '../recipes/recipes-entity.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public recipes$: Observable<Recipe[]>;
  constructor(private recipeService: RecipeEntityService) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeService.entities$;
  }
}

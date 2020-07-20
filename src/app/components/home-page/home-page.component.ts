import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe.model';
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
  onScroll() {
    console.log('scrolled!!');
  }
}

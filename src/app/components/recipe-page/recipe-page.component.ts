import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { RecipeEntityService } from '../recipes/recipes-entity.service';
import { Recipe } from './../models/recipe.model';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent implements OnInit {
  public recipe: Recipe;
  public edit: boolean;
  public id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private recipeService: RecipeEntityService,
    private apiService: ApiService
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.apiService.getRecipe(this.id).subscribe((recipe) => {
      if (recipe) {
        this.recipe = recipe;
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  public displayedColumns: string[] = ['quantity', 'name'];
  async ngOnInit(): Promise<void> {
    this.edit = false;
  }

  async handleDelete(): Promise<void> {
    this.recipeService.delete(this.recipe.id);
    alert('Deleted!');
    this.router.navigate(['/dashboard']);
  }

  handleEditButton(): void {
    this.edit = true;
  }
}

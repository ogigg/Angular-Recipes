import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Recipe } from './../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectRecipe, selectAllRecipes } from '../recipes/recipes.selectors';
import { deleteRecipe } from '../recipes/recipes.actions';
import { RecipeEntityService } from '../recipes/recipes-entity.service';

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
    private recipeService: RecipeEntityService
  ) {}
  public displayedColumns: string[] = ['quantity', 'name'];
  async ngOnInit(): Promise<void> {
    this.edit = false;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.recipeService.collection$.subscribe((collection) => {
      this.recipe = collection.entities[this.id];
    });
  }

  async handleDelete(): Promise<void> {
    this.store.dispatch(deleteRecipe({ recipe: this.recipe }));
    alert('Deleted!');
    this.router.navigate(['/']);
  }

  handleEditButton(): void {
    this.edit = true;
  }
}

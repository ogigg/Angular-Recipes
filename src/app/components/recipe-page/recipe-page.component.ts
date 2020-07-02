import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Recipe } from './../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css'],
})
export class RecipePageComponent implements OnInit {
  public recipe: Recipe;
  public edit: boolean;
  public id: Number;
  constructor(
    private recipesService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.edit = false;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.recipe = await this.getRecipe();
  }

  async getRecipe(): Promise<Recipe> {
    return await this.recipesService.getRecipe(this.id).toPromise();
  }

  async handleDelete(): Promise<void> {
    await this.recipesService.deleteRecipe(this.id).toPromise();
    alert('Deleted!');
    this.router.navigate(['/']);
  }

  handleEditButton(): void {
    this.edit = true;
  }
}

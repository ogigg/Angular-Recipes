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
  recipe: Recipe;
  public edit: boolean;
  public id: Number;
  constructor(
    private recipesService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.edit = false;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipesService.getRecipe(this.id).subscribe((recipe: Recipe) => {
      this.recipe = recipe;
    });
  }

  handleDelete(): void {
    this.recipesService
      .deleteRecipe(this.id)
      .toPromise()
      .then(() => alert('Deleted!'))
      .then(() => this.router.navigate(['/']));
  }

  handleEdit(): void {
    this.edit = !this.edit;
    this.getRecipe();
    window.scrollTo(0, 0);
  }
}

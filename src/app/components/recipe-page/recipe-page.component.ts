import { Component, OnInit } from '@angular/core';
import { ApiService } from "./../api.service";
import { Recipe } from './../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})



export class RecipePageComponent implements OnInit {
  recipe: Recipe;
  public id: Number;
  constructor(private recipesService: ApiService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    // this.recipe = ;
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.recipesService.getRecipe(this.id).subscribe((recipe: any) =>
    {
      this.recipe = recipe;
      console.log(recipe)
    })
  }

  handleDelete() {
    console.log(`handling delete: ${this.id}`)
    this.recipesService.deleteRecipe(this.id).toPromise()
    .then(() => alert("Deleted!"))
    .then(() => this.router.navigate(['/']));

  }

}

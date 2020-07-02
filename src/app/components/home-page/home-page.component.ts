import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false,
  };

  recipes: any[];
  constructor(private recipesService: ApiService) {
    this.recipes = [];
  }

  ngOnInit(): void {
    this.recipesService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
      console.log(recipes);
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-thumbnail',
  templateUrl: './recipe-thumbnail.component.html',
  styleUrls: ['./recipe-thumbnail.component.scss'],
  // inputs: ['recipe']
})
export class RecipeThumbnailComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() size: any;

  style: any;
  constructor() {}

  ngOnInit(): void {
    if (this.size == 'orginal') this.style = { width: '100%', height: 'auto' };
  }
}

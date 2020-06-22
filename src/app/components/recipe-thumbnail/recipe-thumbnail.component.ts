import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-thumbnail',
  templateUrl: './recipe-thumbnail.component.html',
  styleUrls: ['./recipe-thumbnail.component.css'],
  // inputs: ['recipe']
})

export class RecipeThumbnailComponent implements OnInit {
  @Input() recipe: any;
  constructor() { }

  ngOnInit(): void {
  }

}

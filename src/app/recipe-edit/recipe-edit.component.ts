import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../components/models/recipe.model';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../components/api.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() onEditChange = new EventEmitter<boolean>();

  recipeForm = this.fb.group({
    name: ['', Validators.required],
    preparationTime: ['', Validators.required],
    fileUpload: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: this.fb.array([]),
    preparingSteps: this.fb.array([]),
  });

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get preparingSteps() {
    return this.recipeForm.get('preparingSteps') as FormArray;
  }

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.bindInputToForm();
  }

  bindInputToForm(): void {
    this.recipeForm.controls.name.setValue(this.recipe.name);
    this.recipeForm.controls.preparationTime.setValue(
      this.recipe.preparationTime
    );
    this.recipeForm.controls.description.setValue(this.recipe.description);
    this.recipeForm.controls.name.setValue(this.recipe.name);
    this.recipe.ingredients.forEach((ingredient) => {
      this.ingredients.push(
        this.fb.group({
          quantity: [ingredient.quantity],
          name: [ingredient.name],
        })
      );
    });
    this.recipe.preparingSteps.forEach((preparingStep) => {
      this.preparingSteps.push(
        this.fb.control(preparingStep, Validators.required)
      );
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.group({ quantity: [''], name: [''] }));
  }

  addPreparingStep(): void {
    this.preparingSteps.push(this.fb.control('', Validators.required));
  }

  handleCancelButton(): void {
    this.onEditChange.emit(false);
  }

  async handleSubmit(): Promise<void> {
    await this.apiService
      .updateRecipe(this.recipeForm.value, this.recipe.id)
      .toPromise();
    alert('Updated!');
    this.onEditChange.emit(true);
  }
}

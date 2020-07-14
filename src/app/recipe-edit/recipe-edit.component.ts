import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../components/models/recipe.model';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { editRecipe } from '../components/recipes/recipes.actions';
import { RecipeEntityService } from '../components/recipes/recipes-entity.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() edit: boolean;
  @Output() recipeChange = new EventEmitter<Recipe>();
  @Output() editChange = new EventEmitter<boolean>();

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

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private recipeService: RecipeEntityService
  ) {}

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
    this.recipeChange.emit(this.recipe);
    this.editChange.emit(false);
  }

  async handleSubmit(): Promise<void> {
    const updatedRecipe: Recipe = {
      ...this.recipe,
      name: this.recipeForm.value.name,
      preparationTime: this.recipeForm.value.preparationTime,
      description: this.recipeForm.value.description,
      ingredients: this.recipeForm.value.ingredients,
      preparingSteps: this.recipeForm.value.preparingSteps,
    };

    const update: Update<Recipe> = {
      id: updatedRecipe.id,
      changes: updatedRecipe,
    };
    this.recipeService.update(updatedRecipe);
    alert('Updated!');
    this.recipeChange.emit(updatedRecipe);
    this.editChange.emit(false);
  }
}

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
  @Output() getEditChange = new EventEmitter<boolean>();

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

  get f() {
    return this.recipeForm.controls;
  }

  constructor(private fb: FormBuilder, private recipesService: ApiService) {}

  ngOnInit(): void {
    console.log(this.recipe);
    this.bindInputToForm();
  }

  bindInputToForm() {
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

  addIngredient() {
    this.ingredients.push(this.fb.group({ quantity: [''], name: [''] }));
  }

  addPreparingStep() {
    this.preparingSteps.push(this.fb.control('', Validators.required));
  }

  handleCancel(): void {
    this.getEditChange.emit(true);
  }

  onSubmit() {
    console.log(this.recipeForm);
    console.log(this.recipeForm.value);
    this.recipesService
      .updateRecipe(this.recipeForm.value, this.recipe.id)
      .toPromise()
      .then((response) => console.log(response))
      .then(() => alert('Updated!'))
      .then(() => this.handleCancel());
    // .then(() => this.router.navigate(['/']));
  }
}

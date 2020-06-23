import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from "./../api.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css']
})
export class AddRecipePageComponent implements OnInit {
  recipeForm = this.fb.group({
    name: ['', Validators.required],
    preparationTime: ['', Validators.required],
    fileUpload: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: this.fb.array([
      this.fb.group({
        quantity: ['', Validators.required],
        name: ['', Validators.required]
      })
    ]),
    preparingSteps: this.fb.array([
      this.fb.control('', Validators.required)
    ])
  });

  fileErrorMessage = "Upload recipe image here."
  fileToUpload: File = null;
  submitted: Boolean = false;
  constructor(private fb: FormBuilder,
    private recipesService: ApiService,
    private router: Router
    ) { }

  ngOnInit() {
    // this.addPreparingStep();
  }


  handleFileUpload(files: FileList) {
    const types = ['image/png', 'image/jpeg'];
    let image = files.item(0);

    if (types.every(type => image.type !== type))
      this.fileErrorMessage = "Ooops, wrong extension. Upload only image"
    else {
      this.fileToUpload = image;
    }
  }
  addIngredient() {
    this.ingredients.push(this.fb.group({quantity: [''],name: ['']}));
  }

  addPreparingStep() {

    this.preparingSteps.push(this.fb.control('', Validators.required));
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get preparingSteps() {
    return this.recipeForm.get('preparingSteps') as FormArray;
  }

  get f() { return this.recipeForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.recipeForm)
    if (this.recipeForm.invalid) {
      return;
    }
    console.log(this.recipeForm.value)
    this.recipesService.addRecipe(this.recipeForm.value, this.fileToUpload)
    .toPromise()
    .then(() => alert("Added!"))
    .then(() => this.router.navigate(['/']));
  }


}

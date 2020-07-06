import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { ApiService } from './../api.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css'],
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
        name: ['', Validators.required],
      }),
    ]),
    preparingSteps: this.fb.array([this.fb.control('', Validators.required)]),
  });

  public fileMessage: String;
  fileToUpload: File = null;
  submitted: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.get('file.initMessage').subscribe((res: string) => {
      this.fileMessage = res;
    });
  }

  ngOnInit() {}

  handleFileUpload(files: FileList) {
    const types = ['image/png', 'image/jpeg'];
    let image = files.item(0);

    if (types.every((type) => image.type !== type))
      this.translate
        .get('file.error.wrongExtension')
        .subscribe((res: string) => {
          this.fileMessage = res;
        });
    else {
      this.fileToUpload = image;
    }
  }
  addIngredient() {
    this.ingredients.push(this.fb.group({ quantity: [''], name: [''] }));
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

  get form() {
    return this.recipeForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.recipeForm.invalid) {
      return;
    }
    await this.apiService
      .addRecipe(this.recipeForm.value, this.fileToUpload)
      .toPromise();
    alert('Added!');
    this.router.navigate(['/']);
  }
}

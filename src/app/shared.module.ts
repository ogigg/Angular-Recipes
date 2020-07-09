import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { AddRecipePageComponent } from './components/add-recipe-page/add-recipe-page.component';
import { RecipeThumbnailComponent } from './components/recipe-thumbnail/recipe-thumbnail.component';
import { AutosizeModule } from 'ngx-autosize';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    RecipePageComponent,
    AddRecipePageComponent,
    RecipeThumbnailComponent,
    RecipeEditComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    AutosizeModule,
    HttpClientModule,
    TranslateModule,
    MatButtonModule,
    MatInputModule,
    TextFieldModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
  ],
  exports: [
    TranslateModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    HomePageComponent,
    HomePageComponent,
    AddRecipePageComponent,
    RecipeEditComponent,
    RecipePageComponent,
    RecipeThumbnailComponent,
    LoginComponent,
    MatCardModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutosizeModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    TextFieldModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
  ],
})
export class SharedModule {}

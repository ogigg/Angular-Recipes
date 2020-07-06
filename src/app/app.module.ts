import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { AddRecipePageComponent } from './components/add-recipe-page/add-recipe-page.component';
import { RecipeThumbnailComponent } from './components/recipe-thumbnail/recipe-thumbnail.component';
import { AutosizeModule } from 'ngx-autosize';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    RecipePageComponent,
    AddRecipePageComponent,
    RecipeThumbnailComponent,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutosizeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    TextFieldModule,
    MatTableModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

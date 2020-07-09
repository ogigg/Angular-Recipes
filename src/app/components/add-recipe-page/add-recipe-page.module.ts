import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRecipePageRoutingModule } from './add-recipe-page-routing.module';
import { AddRecipePageComponent } from './add-recipe-page.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory, AppModule } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { RecipeThumbnailComponent } from '../recipe-thumbnail/recipe-thumbnail.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AddRecipePageRoutingModule, SharedModule],
})
export class AddRecipePageModule {}

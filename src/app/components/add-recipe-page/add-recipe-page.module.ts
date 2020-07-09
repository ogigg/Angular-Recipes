import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRecipePageRoutingModule } from './add-recipe-page-routing.module';
import { AddRecipePageComponent } from './add-recipe-page.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [AddRecipePageComponent],
  imports: [CommonModule, AddRecipePageRoutingModule, SharedModule],
})
export class AddRecipePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipePageRoutingModule } from './recipe-page-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { RecipePageComponent } from './recipe-page.component';

@NgModule({
  declarations: [RecipePageComponent],
  imports: [CommonModule, RecipePageRoutingModule, SharedModule],
})
export class RecipePageModule {}

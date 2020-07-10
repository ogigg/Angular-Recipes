import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipePageComponent } from './recipe-page.component';

const routes: Routes = [{ path: '', component: RecipePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipePageRoutingModule {}

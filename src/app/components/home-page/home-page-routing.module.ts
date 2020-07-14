import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { RecipesResolver } from '../recipes/recipes.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    resolve: { recipes: RecipesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

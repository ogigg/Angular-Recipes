import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipePageComponent } from './components/add-recipe-page/add-recipe-page.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './components/auth-guard.service';

const routes: Routes = [
  {
    path: 'recipe/:id',
    loadChildren: () =>
      import('src/app/components/recipe-page/recipe-page.module').then(
        (m) => m.RecipePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-recipe',
    loadChildren: () =>
      import('src/app/components/add-recipe-page/add-recipe-page.module').then(
        (m) => m.AddRecipePageModule
      ),
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    loadChildren: () =>
      import('src/app/components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    loadChildren: () =>
      import('src/app/components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

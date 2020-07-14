import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

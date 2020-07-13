import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { EffectsModule } from '@ngrx/effects';
import { recipesReducer } from '../recipes/recpes.reducers';
import { StoreModule } from '@ngrx/store';
import { RecipesEffects } from '../recipes/recipes.effects';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
})
export class HomePageModule {}

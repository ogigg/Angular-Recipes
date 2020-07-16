import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { RecipesResolver } from '../recipes/recipes.resolver';
import { RecipeEntityService } from '../recipes/recipes-entity.service';
import {
  EntityCollectionServiceElementsFactory,
  EntityMetadataMap,
  EntityDefinitionService,
  EntityDataService,
  DefaultDataServiceConfig,
  DefaultDataService,
} from '@ngrx/data';
import { RecipesDataService } from '../recipes/recipes-data.service';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
  providers: [
    RecipesResolver,
    RecipeEntityService,
    EntityCollectionServiceElementsFactory,
    RecipesDataService,
  ],
})
export class HomePageModule {}

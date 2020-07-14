import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { EffectsModule } from '@ngrx/effects';
import { recipesReducer } from '../recipes/recipes.reducers';
import { StoreModule } from '@ngrx/store';
import { RecipesEffects } from '../recipes/recipes.effects';
import { RecipesResolver } from '../recipes/recipes.resolver';
import { RecipeEntityService } from '../recipes/recipes-entity.service';
import {
  EntityCollectionServiceElementsFactory,
  EntityMetadataMap,
  EntityDefinitionService,
} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Recipe: {},
};

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
  providers: [
    RecipesResolver,
    RecipeEntityService,
    EntityCollectionServiceElementsFactory,
  ],
})
export class HomePageModule {
  constructor(private eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}

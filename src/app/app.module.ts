import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './components/jwt.interceptor';
import { SharedModule } from './shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './components/login/auth.module';
import { recipesReducer } from './components/recipes/recipes.reducers';
import { RecipesEffects } from './components/recipes/recipes.effects';
import { RecipeEntityService } from './components/recipes/recipes-entity.service';
import { RecipesResolver } from './components/recipes/recipes.resolver';
import {
  EntityDataModule,
  DefaultDataServiceConfig,
  EntityDefinitionService,
  EntityDataService,
  EntityMetadataMap,
} from '@ngrx/data';
import { RecipesDataService } from './components/recipes/recipes-data.service';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:4000/api/',
};

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:4000'],
        disallowedRoutes: [],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forFeature('recipes', recipesReducer),
    EffectsModule.forRoot([RecipesEffects]),
    AuthModule.forRoot(),
    EntityDataModule.forRoot({}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    RecipesDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private recipesDataService: RecipesDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Recipes', recipesDataService);
  }
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function tokenGetter() {
  return localStorage.getItem('token');
}

const entityMetadata: EntityMetadataMap = {
  Recipe: {},
};

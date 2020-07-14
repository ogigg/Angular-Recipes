import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeEntityService } from './recipes-entity.service';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipesResolver implements Resolve<boolean> {
  constructor(private recipeService: RecipeEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.recipeService.getAll().pipe(map((recipes) => !!recipes));
  }
}

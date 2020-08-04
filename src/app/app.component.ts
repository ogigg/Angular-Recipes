import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { login } from './components/login/auth.actions';
import { RecipeEntityService } from './components/recipes/recipes-entity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'angular-recipes';

  constructor(
    private translate: TranslateService,
    private store: Store,
    private recipeService: RecipeEntityService
  ) {
    translate.setDefaultLang(translate.getBrowserLang());
  }

  ngOnInit() {
    const userProfile = localStorage.getItem('user');

    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
      this.recipeService.getAll();
    }
  }
}

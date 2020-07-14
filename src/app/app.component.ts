import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { login } from './components/login/auth.actions';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterEvent,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private store: Store,
    private router: Router
  ) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.checkEvent(e);
    });
    translate.setDefaultLang(translate.getBrowserLang());
  }
  title = 'angular-recipes';
  public isLoading = true;
  ngOnInit() {
    const userProfile = localStorage.getItem('user');

    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }
  }

  checkEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.isLoading = true;
    } else if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.isLoading = false;
    }
  }
}

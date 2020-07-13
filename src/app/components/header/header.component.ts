import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { logout } from '../login/auth.actions';
import { Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from '../login/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  private currentLanguage = this.translate.getDefaultLang();

  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;
  ngOnInit(): void {}

  handleChangeLanguage(): void {
    if (this.currentLanguage === 'en') {
      this.translate.use('pl');
      this.currentLanguage = 'pl';
    } else {
      this.translate.use('en');
      this.currentLanguage = 'en';
    }
  }

  handleLogOut() {
    // this.authService.logout();
    this.store.dispatch(logout());
  }
}

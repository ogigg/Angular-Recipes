import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { AuthService } from '../auth.service';
import { logout } from '../login/auth.actions';
import { selectIsLoggedIn } from '../login/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private store: Store<AppState>
  ) {
    this.isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));
  }

  private currentLanguage = this.translate.getDefaultLang();

  public isLoggedIn$: Observable<boolean>;

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
    this.store.dispatch(logout());
  }
}

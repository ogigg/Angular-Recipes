import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn
      .pipe(takeWhile(() => this.alive))
      .subscribe((value) => {
        this.isLogged = value;
      });
  }

  private alive: boolean = true;
  private currentLanguage = this.translate.getDefaultLang();

  public isLogged: boolean = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.alive = false;
  }
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
    this.authService.logout();
  }
}

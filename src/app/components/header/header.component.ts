import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private authService: AuthService
  ) {
    this.authService.isLogged.subscribe((value) => {
      this.isLogged = value;
    });
  }
  private currentLanguage = this.translate.getDefaultLang();

  public isLogged: boolean = false;
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
    this.authService.logout();
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectUser } from '../auth.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  @ViewChild('input1') inputEl: ElementRef;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.store.select(selectUser).subscribe((user) => (this.user = user));
  }
  public user: User;
  public timer = 59;
  ngOnInit(): void {}

  async login(form) {
    const response = await this.authService.login(
      form.value.email,
      form.value.password
    );
    //   if (response.success === true) {
    //     this.store.dispatch(login({ user: response.user }));
    //     this.router.navigate(['/login/2fa']); //[this.redirectUrl]);
    //   } else {
    //     this.snackBar.open(this.snackBarMessage, 'OK', {
    //       duration: 2000,
    //     });
    //   }
  }

  onKey(event: any) {
    console.log(event);
    console.log(event.target.id);
    console.log(event.key);
    console.log(event.target.value);
    setTimeout(() => this.inputEl.nativeElement.focus());
  }
}

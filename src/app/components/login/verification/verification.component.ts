import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectUser } from '../auth.selectors';
import { User } from '../../models/user.model';
import { Observable, timer, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { login } from '../auth.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;
  @ViewChild('2faForm') form: ElementRef;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.store.select(selectUser).subscribe((user) => (this.user = user));
    activatedRoute.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.redirectUrl = params.returnUrl;
      }
    });
  }
  public user: User;
  private redirectUrl = '/dashboard';
  private inputs: ElementRef[];
  ngOnInit(): void {
    setTimeout(() => this.input1.nativeElement.focus());
    timer(0, 1000)
      .pipe(take(60))
      .subscribe((timeElapsed) => (this.timer = 60 - timeElapsed));
  }

  // counter$: Observable<number>;
  timer = 60;

  ngAfterViewInit() {
    this.inputs = [
      this.input1,
      this.input2,
      this.input3,
      this.input4,
      this.input5,
      this.input6,
    ];
  }

  async login(form) {
    const response = await this.authService.verify(form.value, this.user);
    if (response.success === true) {
      this.store.dispatch(login({ user: response.user }));
      this.router.navigate([this.redirectUrl]); //[this.redirectUrl]);
    } else {
      this.snackBar.open(this.snackBarMessage, 'OK', {
        duration: 2000,
      });
    }
  }

  calculateNextInput(currentId: string, key: string, inputValue: string) {
    const currentInput = parseInt(currentId.slice(-1)) - 1;
    if (key === 'Backspace') {
      if (currentInput !== 0) {
        if (inputValue === '') {
          this.inputs[currentInput - 1].nativeElement.focus();
          this.inputs[currentInput - 1].nativeElement.value = '';
        }
        this.inputs[currentInput - 1].nativeElement.focus();
      }
      if (currentInput !== 0) {
        this.inputs[currentInput - 1].nativeElement.focus();
      }
    } else {
      if (currentInput === 5) {
        console.log(this.form);
        console.log('Login');
        this.login(this.form);
      } else {
        this.inputs[currentInput + 1].nativeElement.focus();
      }
    }
  }

  onKey(event: any) {
    this.calculateNextInput(event.target.id, event.key, event.target.value);
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectUser } from '../auth.selectors';
import { User } from '../../models/user.model';
import { Observable, timer, interval, fromEvent, merge } from 'rxjs';
import { take, map, debounce } from 'rxjs/operators';
import { login } from '../auth.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NgForm, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    let clipboardData = e.clipboardData || window['clipboardData'];
    let pastedText = clipboardData.getData('text');
    if (pastedText.length === 6 && /\d\d\d\d\d\d/.test(pastedText)) {
      Object.keys(this.verificationForm.controls).forEach((key, index) => {
        this.verificationForm.controls[key].setValue(pastedText[index]);
      });
      this.login(this.verificationForm);
    }
  }
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;
  @ViewChild('2faForm', { read: NgForm }) form: any;
  public verificationForm = new FormGroup({
    input1: new FormControl(''),
    input2: new FormControl(''),
    input3: new FormControl(''),
    input4: new FormControl(''),
    input5: new FormControl(''),
    input6: new FormControl(''),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    activatedRoute: ActivatedRoute,
    translate: TranslateService
  ) {
    this.store.select(selectUser).subscribe((user) => (this.user = user));
    activatedRoute.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.redirectUrl = params.returnUrl;
      }
    });
    translate.get('login-snackbar').subscribe((res: string) => {
      this.snackBarMessage = res;
    });
  }

  private allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  private snackBarMessage: string = '';
  public user: User;
  private redirectUrl = '/dashboard';
  private inputs: ElementRef[];
  ngOnInit(): void {
    setTimeout(() => this.input1.nativeElement.focus());
    timer(0, 1000)
      .pipe(take(61))
      .subscribe((timeElapsed) => (this.timer = 60 - timeElapsed));
  }

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
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  calculateNextInput(currentId: string, key: string, inputValue: string) {
    const currentInput = parseInt(currentId.slice(-1)) - 1;
    if (key === 'Backspace') {
      if (currentInput !== 0) {
        if (this.verificationForm.controls[currentId].value != '') {
          this.verificationForm.controls[currentId].setValue('');
        } else {
          this.verificationForm.controls[`input${currentInput}`].setValue('');
          this.inputs[currentInput - 1].nativeElement.focus();
        }
      }
    } else if (key === 'ArrowLeft') {
      if (currentInput !== 0) {
        this.inputs[currentInput - 1].nativeElement.focus();
      }
    } else if (key === 'ArrowRight') {
      if (currentInput < 5) {
        this.inputs[currentInput + 1].nativeElement.focus();
      }
    } else if (this.allowedKeys.includes(key)) {
      if (currentInput === 5) {
        if (this.verificationForm.valid) {
          this.login(this.verificationForm);
        } else {
          this.verificationForm.markAllAsTouched();
        }
      } else {
        this.inputs[currentInput + 1].nativeElement.focus();
      }
    } else {
      this.verificationForm.controls[currentId].markAsTouched();
      this.verificationForm.controls[currentId].setValue('');
    }
  }
  onKey(event: any) {
    this.calculateNextInput(event.target.id, event.key, event.target.value);
  }
}

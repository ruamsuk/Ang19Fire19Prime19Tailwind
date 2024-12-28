import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';

@Component({
  selector: 'app-login',
  imports: [SharedModule, NgClass, RouterLink],
  template: `
    <div class="flex justify-center items-center h-screen gap-y-5">
      <div>
        <form [formGroup]="loginForm" (ngSubmit)="login()">
          <p-card [style]="{width:'360px'}">
            <div class="flex justify-center">
              <img src="/images/primeng-logo.png" alt="logo">
            </div>
            <div class="flex justify-center text-900 text-2xl font-medium my-5">
              Ruamsuk Acc.
            </div>
            <ng-template pTemplate="p-card-content">
              <div class="field my-2">
                @if (isEmailValid) {
                  <label [ngClass]="{'p-error': isEmailValid}" class="mb-2">Email</label>
                } @else {
                  <label>Email</label>
                }
                <input
                  type="email"
                  pInputText
                  formControlName="email"
                  name="email"
                  id="email"
                  class="w-full {{ isEmailValid ? 'ng-invalid ng-dirty' : '' }} mt-1"
                  autocomplete="email"/>
                @if (isEmailValid; as message) {
                  <small class="block p-error pl-2 py-2 font-semibold">
                    {{ message }}
                  </small>
                }
              </div>
              <div class="field my-3">
                @if (isValidPassword) {
                  <label [ngClass]="{'p-error': isValidPassword}">Password</label>
                } @else {
                  <label>Password</label>
                }
                <p-password
                  class="w-full {{
                    isValidPassword ? 'ng-invalid ng-dirty' : ''
                  }} mt-2"
                  [feedback]="false"
                  formControlName="password"
                  styleClass="p-password p-component p-inputwrapper p-input-icon-right"
                  [style]="{ width: '100%' }"
                  [inputStyle]="{ width: '100%' }"
                  [toggleMask]="true"
                  autocomplete="password"
                />
                @if (isValidPassword; as messages) {
                  <small class="block p-error pl-2 font-semibold">
                    {{ messages }}
                  </small>
                }
                <div class="my-5">
                  <span
                    class="sarabun text-sky-400 italic cursor-pointer hover:text-sky-300"
                    (click)="forgotPassword()"
                  >
                    ลืมรหัสผ่าน
                  </span>
                </div>
              </div>
            </ng-template>
            <ng-template pTemplate="footer">
              <div class="flex gap-3 -mt-5">
                <p-button
                  label="Login"
                  class="w-full"
                  styleClass="w-full"
                  [disabled]="loginForm.invalid"
                  type="submit"
                  [loading]="loading"
                />
              </div>
              <div class="mt-2 mg-5 ml-2">
                Not a member?
                <a routerLink="" class="cursor-pointer" (click)="addMessage()">
                  <span class="text-blue-600>Register">Register</span>
                </a>
              </div>
            </ng-template>
          </p-card>
        </form>
      </div>
    </div>
  `,
  styles: `
    .ng-invalid.ng-dirty {
      //border-color: red;
      color: #e93434;
    }

    .p-error {
      color: #e93434;
    }
  `
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  dialogService = inject(DialogService);
  message = inject(MessageService);
  router = inject(Router);

  ref: DynamicDialogRef | undefined;

  loading: boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get isEmailValid(): string | boolean {
    const control = this.loginForm.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'This field is required'
        : 'Enter a valid email';
    }

    return false;
  }

  get isValidPassword(): string | boolean {
    const control = this.loginForm.get('password');
    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('minlength')) {
        return 'Password must be at least 8 characters long';
      } else {
        return 'Enter a valid password';
      }
    }

    return false;
  }

  login() {
    const {email, password} = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.loading = true;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.message.add({severity: 'success', summary: 'Success', detail: 'Login successful'});
      },
      error: (error) => {
        this.setTimer();
        this.message.add({severity: 'error', summary: 'Error', detail: error.message});
      },
      complete: () => {
        this.setTimer();
        this.router.navigateByUrl('/home').then();
      }
    });
  }

  setTimer() {
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  forgotPassword() {
    this.ref = this.dialogService.open(ForgotPasswordComponent, {
      header: 'Forgot Password',
      width: '360px',
      modal: true,
      contentStyle: {overflow: 'auto'},
      breakpoints: {
        '960px': '360px',
        '640px': '360px',
      }
    });
  }

  addMessage() {
    this.message.add({severity: 'info', summary: 'Info', detail: 'Feature coming soon'});
  }
}

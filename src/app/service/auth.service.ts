import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth | undefined;
  router = inject(Router);
  currentUser$: Observable<User | null>;
  currentUser: Signal<User | null | undefined>;
  private timeout: any;

  constructor() {
    this.auth = inject(Auth);
    this.currentUser$ = authState(this.auth);
    this.currentUser = toSignal<User | null>(this.currentUser$);
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(<Auth>this.auth, email, password));
  }

  startTimer() {
    this.timeout = setTimeout(
      () => {
        this.logout().then(() => {
          console.log('logout');
          this.router.navigateByUrl('/auth/login').then();
        });
      },
      30 * 60 * 1000,
    ); // 30 minutes
  }

  resetTimer() {
    clearTimeout(this.timeout);
    this.startTimer();
  }

  forgotPassword(email: string) {
    return from(sendPasswordResetEmail(<Auth>this.auth, email));
  }

  async logout(): Promise<void> {
    return await signOut(this.auth!);
  }
}

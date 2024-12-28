import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  template: `
    <div class="flex justify-center items-center h-screen">
      @if (currentUser()) {
        <p-button severity="primary" label="Logout" (onClick)="logout()"></p-button>
      }
    </div>
  `,
  styles: ``
})
export class HomeComponent {
  private auth: AuthService = inject(AuthService);
  currentUser = this.auth.currentUser;
  private router: Router = inject(Router);

  logout() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/auth/login').then();
    });
  }
}

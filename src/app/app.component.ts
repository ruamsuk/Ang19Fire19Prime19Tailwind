import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import Aura from '@primeng/themes/aura';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  template: `
    <p-toast/>
    <router-outlet/>
  `,
  styles: [
    `
      :host ::ng-deep .p-toast-detail {
        font-style: italic;
      }

      :host ::ng-deep .p-toast-summary .p-toast-message {
        font-size: 1.25rem !important;
      }
    `,
  ],
})
export class AppComponent {
  auth = inject(AuthService);
  router = inject(Router);

  constructor(
    private primeng: PrimeNG,
    private translate: TranslateService) {
    this.primeng.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
    this.translate.addLangs(['en', 'th']);
    this.translate.setDefaultLang('th');
    this.translate.use('th');
    this.translate.get('th')
      .pipe(take(1))
      .subscribe((lang) => this.primeng.setTranslation(lang));
    this.primeng.theme.set({
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities'
        }
      }
    });
  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  resetTimer() {
    this.auth.resetTimer();
  }
}

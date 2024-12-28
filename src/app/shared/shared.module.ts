import { NgModule } from '@angular/core';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { Toolbar, ToolbarModule } from 'primeng/toolbar';
import { Button, ButtonDirective, ButtonModule } from 'primeng/button';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { Password, PasswordModule } from 'primeng/password';
import { Card, CardModule } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { Toast, ToastModule } from 'primeng/toast';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { Menubar, MenubarModule } from 'primeng/menubar';

@NgModule({
  imports: [
    AvatarModule,
    ButtonModule,
    CardModule,
    ToolbarModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    PrimeTemplate,
    ReactiveFormsModule,
    ButtonDirective,
    TieredMenuModule,
    MenubarModule
  ],
  exports: [
    Avatar,
    Button,
    Card,
    Toolbar,
    Toast,
    InputText,
    Password,
    PrimeTemplate,
    ReactiveFormsModule,
    ButtonDirective,
    TieredMenu,
    Menubar
  ],
})
export class SharedModule {
}

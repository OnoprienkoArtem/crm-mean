import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {CheckFormFieldValidityDirective} from './shared/directives/check-form-field-validity.directive';
import { FormErrorComponent } from './shared/form-error/form-error.component';
import { FormErrorDirective } from './shared/directives/form-error.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    CheckFormFieldValidityDirective,
    FormErrorComponent,
    FormErrorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

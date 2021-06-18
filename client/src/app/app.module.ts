import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TokenInterceptor } from '@app/shared/interceptors/token.interceptor';
import { AuthModule } from '@app/auth';
import { AppRoutingModule } from '@app/app-routing.module';

import { AppComponent } from '@app/app.component';
import { AuthLayoutComponent } from '@app/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from '@app/layouts/site-layout/site-layout.component';
import { FormErrorComponent } from '@app/shared/form-error/form-error.component';

import { CheckFormFieldValidityDirective } from '@app/shared/directives/check-form-field-validity.directive';

import { FormErrorPipe } from '@app/shared/pipes/form-error.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    CheckFormFieldValidityDirective,
    FormErrorComponent,
    FormErrorPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

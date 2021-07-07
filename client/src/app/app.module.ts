import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@app/core/core.module';

import { AuthModule } from '@app/auth';
import { AppRoutingModule } from '@app/app-routing.module';

import { AppComponent } from '@app/app.component';
import { AuthLayoutComponent, SiteLayoutComponent } from '@app/layouts';

@NgModule({
  declarations: [ AppComponent, AuthLayoutComponent, SiteLayoutComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

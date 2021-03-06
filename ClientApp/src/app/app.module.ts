import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { QuotationComponent } from './quotation/quotation/quotation.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    QuotationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule,
    RouterModule.forRoot([
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
      path: 'login/callback',
      component: OktaCallbackComponent,
    },
    { path: 'get-quote', component: QuotationComponent, canActivate: [OktaAuthGuard] },
], { relativeLinkResolution: 'legacy' })
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: environment.okta }],
  bootstrap: [AppComponent]
})
export class AppModule { }

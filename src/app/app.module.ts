import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DxHttpModule} from 'devextreme-angular/http';
import {SideNavInnerToolbarModule, SideNavOuterToolbarModule, SingleCardModule} from './layouts';
import {
  ChangePasswordFormModule,
  CreateAccountFormModule,
  FooterModule,
  LoginFormModule,
  ResetPasswordFormModule,
  StateCityModule
} from './shared/components';
import {AppInfoService, AuthService, ScreenService} from './shared/services';
import {UnauthenticatedContentModule} from './unauthenticated-content';
import {AppRoutingModule} from './app-routing.module';
import {ListModule} from './shared/components/list/list.component';
import {PopupModule} from './shared/components/popup/popup.component';
import {DxPopupModule, DxScrollViewModule, DxSpeedDialActionModule} from "devextreme-angular";
import {DxiToolbarItemModule} from "devextreme-angular/ui/nested";
import {AddFormModule} from './shared/components/add-form/add-form.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    StateCityModule,
    ListModule,
    PopupModule,
    AddFormModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSpeedDialActionModule,
    DxiToolbarItemModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

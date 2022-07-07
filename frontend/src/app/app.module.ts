import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SessionCookieInterceptorProvider } from './shared/interceptors/session-cookie.interceptor';
import { CheckProfileGuard } from './shared/guards/check-profile.guard';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { STORE } from './shared/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HomePageModule } from './home/home.module';
import { UnauthorizedInterceptorProvider } from './shared/interceptors/unauthorized.interceptor';
import { FriendsPageModule } from './home/friends/friends.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupListPageModule } from './home/group-list/group-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot(STORE, {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    HomePageModule,
    FriendsPageModule,
    FormsModule,
    ReactiveFormsModule,
    GroupListPageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SessionCookieInterceptorProvider,
    UnauthorizedInterceptorProvider,
    CheckProfileGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

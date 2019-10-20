import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AgmCoreModule } from '@agm/core';
import { Network } from '@ionic-native/network/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { VDateTimePipe } from './pipe/vdate-time.pipe';
import { PipeModule } from './pipe/pipe.module';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { urlsAuth } from './util/auth.config';
import { AuthGuard } from './util/auth-guard';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    PipeModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCsT_O-XMJwHBfETVpFVFA_lLz0pG31r0',
      libraries: ['places']
    }),
    OAuthModule.forRoot(urlsAuth),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      mode: 'ios'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    NgxImageCompressService, Platform, WebView, Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: OAuthStorage, useValue: localStorage },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

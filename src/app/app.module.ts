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
import { PipeModule } from './pipe/pipe.module';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { urlsAuth } from './util/auth.config';
import { AuthGuard } from './util/auth-guard';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { TabsRepairerPageModule } from './repairer/tabs/tabs.module';
import { GuideSlidesModule } from './guide-slides/guide-sildes.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    PipeModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDPeg9P7THit_cAZ8IGKoNn84FPwQrgNE',
      libraries: ['places']
    }),
    OAuthModule.forRoot(urlsAuth),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      mode: 'ios'
    }),
    LazyLoadImageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    GuideSlidesModule,
    TabsRepairerPageModule
  ],
  providers: [
    NgxImageCompressService, Platform, WebView, Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: OAuthStorage, useValue: localStorage },
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

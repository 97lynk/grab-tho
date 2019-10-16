import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    PipeModule,
    AppRoutingModule, HttpClientModule, BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCsT_O-XMJwHBfETVpFVFA_lLz0pG31r0',
      libraries: ['places']
    }),

    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      mode: 'ios'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NgxImageCompressService,
    Platform, WebView, Network,
    // {provide: Camera, useClass: CameraMock},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

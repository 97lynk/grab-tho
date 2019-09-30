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
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { Platform } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
// import { CameraMock } from '@ionic-native-mocks/camera';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Storage } from '@ionic/storage';
import { CameraMock } from './mock/camera-mock';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDarfxy_9aCD-VqgyHXBz1t73qLbxpjlWk',
      libraries: ['places']
    }),
    IonicStorageModule.forRoot(),
    // MapsAPILoader,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera, NgxImageCompressService,
    File, Platform, WebView, FilePath,
    // {provide: Camera, useClass: CameraMock},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

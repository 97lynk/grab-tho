import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConnectivityService } from '../service/connectivity.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  // @ViewChild('map', { static: false }) mapElement: ElementRef;

  // map: any;
  // mapInitialised = false;
  // apiKey: any;

  // constructor(public nav: NavController, private geolocation: Geolocation,
  //   public connectivityService: ConnectivityService) {
  //   this.apiKey = 'AIzaSyBJJPAC0oOZpV6tXVNjyDXQeNj1Lw3u-UY';
  //   this.loadGoogleMaps();
  // }

  // loadGoogleMaps() {

  //   this.addConnectivityListeners();

  //   if (typeof google === 'undefined' || typeof google.maps === 'undefined') {

  //     console.log('Google maps JavaScript needs to be loaded.');
  //     this.disableMap();

  //     if (this.connectivityService.isOnline()) {
  //       console.log('online, loading map');

  //       // Load the SDK
  //       window['mapInit'] = () => {
  //         this.initMap();
  //         this.enableMap();
  //       };

  //       const script = document.createElement('script');
  //       script.id = 'googleMaps';

  //       if (this.apiKey) {
  //         script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
  //       } else {
  //         script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
  //       }

  //       document.body.appendChild(script);

  //     }
  //   } else {

  //     if (this.connectivityService.isOnline()) {
  //       console.log('showing map');
  //       this.initMap();
  //       this.enableMap();
  //     } else {
  //       console.log('disabling map');
  //       this.disableMap();
  //     }

  //   }

  // }

  // initMap() {

  //   this.mapInitialised = true;

  //   this.geolocation.getCurrentPosition().then((position) => {

  //     const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  //     const mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     };

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //   });

  // }

  // disableMap() {
  //   console.log('disable map');
  // }

  // enableMap() {
  //   console.log('enable map');
  // }

  // addConnectivityListeners() {

  //   const onOnline = () => {

  //     setTimeout(() => {
  //       if (typeof google === 'undefined' || typeof google.maps === 'undefined') {

  //         this.loadGoogleMaps();

  //       } else {

  //         if (!this.mapInitialised) {
  //           this.initMap();
  //         }

  //         this.enableMap();
  //       }
  //     }, 2000);

  //   };

  //   const onOffline = () => {
  //     this.disableMap();
  //   };

  //   document.addEventListener('online', onOnline, false);
  //   document.addEventListener('offline', onOffline, false);

  // }

}
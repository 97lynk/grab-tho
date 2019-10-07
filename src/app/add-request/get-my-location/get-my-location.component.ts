import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, IonSearchbar, Platform } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
declare var google;
import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
import { ControlPosition, ZoomControlOptions, ZoomControlStyle } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-get-my-location',
  templateUrl: './get-my-location.component.html',
  styleUrls: ['./get-my-location.component.scss'],
})
export class GetMyLocationComponent implements OnInit {

  // hcmc
  myLocation = { lat: 10.8230989, lng: 106.6296638 };

  options: GeolocationOptions;
  currentPos: Geoposition;
  service: any;
  geocoder: any;
  hideSearchBox = true;
  autocompleteItems = [];
  searchInput = '';

  zoomConfig: ZoomControlOptions = {
    position: ControlPosition.TOP_LEFT,
    style: ZoomControlStyle.SMALL
  };

  @ViewChild(IonSearchbar, { static: true })
  searchBar: IonSearchbar;

  @ViewChild('input2', { static: false })
  ip: ElementRef;

  constructor(public navController: NavController, private geolocation: Geolocation,
    private apiLoader: MapsAPILoader, private ngZone: NgZone, private platform: Platform) {
  }

  ngOnInit(): void {
    this.platform.ready()
      .then(() => {
      });

    console.log(this.searchBar);
    this.apiLoader.load()
      .then(() => {
        this.service = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();
      })
      .catch((err) => console.log(err));
  }

  updateListPlace() {
    console.log('input ', this.searchInput);

    this.autocompleteItems = [];
    if (this.searchInput === '') { return; }

    this.service.getPlacePredictions({ input: this.searchInput, componentRestrictions: { country: 'vn' } },
      (predictions, status) => {
        if (status === 'OK' && predictions !== 'undefined') {
          this.ngZone.run(() => {
            predictions.forEach((p) => {
              this.autocompleteItems.push({
                description: p['description'],
                main_text: p['structured_formatting']['main_text'],
                secondary_text: p['structured_formatting']['secondary_text'],
                place_id: p['place_id']
              });
            });

            console.log(this.autocompleteItems);
          });
        }
      });

  }

  selectSearchResult(item) {
    // this.clearMarkers();
    this.searchInput = item.description;
    this.autocompleteItems = [];
    console.log('click ', item);
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      this.ngZone.run(() => {
        if (status === 'OK' && results[0]) {
          this.myLocation = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          console.log('decode place id ', this.myLocation);
        }
      });
    });
  }

  getUserPosition() {
    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;

      this.myLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      console.log(pos);

    }, (err: PositionError) => {
      console.log('error : ' + err.message);
    });
  }

  goBack() {
    this.navController.pop();
  }

}
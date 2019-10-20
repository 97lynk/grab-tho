import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const REQUEST_API = `${environment.serviceUrl}/requests`;

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService) { }

  getAndFilterBy(statuses: string[]) {
    return this.http.get(REQUEST_API, {
      params: { status: statuses }
    });
  }

  postRequest() {
    return this.http.post(REQUEST_API, {
      textDescription: this.storageService.get('textDescription'),
      address: this.storageService.get('address'),
      longitude: this.storageService.get('lng'),
      latitude: this.storageService.get('lat')
    });
  }
}

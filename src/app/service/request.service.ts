import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { dataURItoBlob } from '../util/file.util';
import { RecentRequest } from '../dto/request';

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

  getRequest(id: number) {
    return this.http.get(`${REQUEST_API}/${id}`);
  }

  async postRequest() {

    const request = await this.restoreRequestFromStorage();

    const formData = new FormData();

    request.imagesDescription
      .map(i => dataURItoBlob(i))
      // .map(i => new Blob([window.atob(i)], { type: 'image/png' }))
      .map(b => new File([b], 'image.png', { type: 'image/png', lastModified: Date.now() }))
      .forEach(file => formData.append('images', file));

    const imagesDescription = await this.http.post<string[]>(`${REQUEST_API}/description-images`, formData).toPromise();
    request.imagesDescription = imagesDescription;

    return this.http.post(REQUEST_API, request).toPromise();
  }

  async restoreRequestFromStorage() {
    return {
      imagesDescription: await this.storageService.get('imagesDescription'),
      textDescription: await this.storageService.get('textDescription'),
      address: await this.storageService.get('address'),
      longitude: await this.storageService.get('lng'),
      latitude: await this.storageService.get('lat')
    };
  }
}

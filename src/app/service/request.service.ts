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

  getRequest(id: number | string) {
    return this.http.get(`${REQUEST_API}/${id}`);
  }

  async postRequest(updatePercent: (percent: number, buffer: number, iconName: string) => any) {

    const request = await this.restoreRequestFromStorage();
    updatePercent(0.05, 0.4, 'list');
    const formData = new FormData();
    updatePercent(0.1, 0.6, 'list');
    request.imagesDescription.map(i => dataURItoBlob(i));
    updatePercent(0.3, 0.7, 'images');
    request.imagesDescription.map(b => new File([b], 'image.png', { type: 'image/png', lastModified: Date.now() }));
    updatePercent(0.4, 0.8, 'images');
    request.imagesDescription.forEach(file => formData.append('images', file));
    const imagesDescription = await this.http.post<string[]>(`${REQUEST_API}/description-images`, formData).toPromise();
    updatePercent(0.8, 0.9, 'pin');
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

  acceptRepairerForRequest(requestId: number, repairerId: number) {
    return this.http.put(`${REQUEST_API}/${requestId}?repairer_id=${repairerId}`, {});
  }
}

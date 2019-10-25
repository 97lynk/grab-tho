import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { dataURItoBlob } from '../util/file.util';
import { RecentRequest } from '../dto/request';

const REQUEST_API = `${environment.serviceUrl}/requests`;
const REPAIRER_API = `${environment.serviceUrl}/repairers`;

@Injectable({
  providedIn: 'root'
})
export class RepairerService {


  constructor(
    private http: HttpClient) { }

  getRepairerJoinedRequest(requestId: number | string, actions: string[]) {
    return this.http.get(`${REQUEST_API}/${requestId}/histories/repairers`, {
      params: { actions }
    });
  }


  getARepairerWithHistories(requestId: number | string, repairerId: number | string) {
    return this.http.get(`${REQUEST_API}/${requestId}/histories/repairers/${repairerId}`);
  }

  getRepairer(repairerId: number | string) {
    return this.http.get(`${REPAIRER_API}/${repairerId}`);
  }
}

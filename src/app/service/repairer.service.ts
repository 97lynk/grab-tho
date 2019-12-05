import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const REQUEST_API = `${environment.serviceUrl}/requests`;
const REPAIRER_API = `${environment.serviceUrl}/repairers`;
const HISTORIES_API = `${environment.serviceUrl}/histories`;
const ACCOUNTS_API = `${environment.serviceUrl}/accounts`;

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

  getRateRepairer(repairerId: number | string) {
    return this.http.get(`${REPAIRER_API}/${repairerId}/rate`);
  }

  actionRequest(requestId: number | string, repairerId: number | string, point: number, action: string) {
    return this.http.post(HISTORIES_API, { requestId, repairerId, point, action });
  }

  getHistoryInRequests(requestId: number[]) {
    return this.http.get(HISTORIES_API, {
      params: {
        requestId: requestId.join(',')
      }
    });
  }

  updateProfile(repairerId: number, profile: any) {
    return this.http.put(`${ACCOUNTS_API}/${repairerId}`, profile);
  }

  updateAvatar(repairerId: number, avatarUrl: string) {
    return this.http.put(`${ACCOUNTS_API}/${repairerId}/avatar`, avatarUrl);
  }

  updateSetting(userId: number, setting: any) {
    return this.http.put(`${ACCOUNTS_API}/${userId}/setting`, setting);
  }

  getTransactionHistories(repairerId: number) {
    return this.http.get(`${REPAIRER_API}/${repairerId}/wallet-histories`);
  }

  getFeedback() {
    return this.http.get(`${HISTORIES_API}/feedback`);
  }

  closeRequest(requestId: number | string) {
    return this.http.delete(`${HISTORIES_API}?requestId=${requestId}`);
  }

  changePassword(oldPassword, newPassword, userId) {
    return this.http.post(`${ACCOUNTS_API}/${userId}/password?=${oldPassword}&password=${newPassword}`, {});
  }

}

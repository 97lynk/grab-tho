import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as jwtDecode from 'jwt-decode';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private oauthService: OAuthService,
        private router: Router) {
    }

    canActivate() {
        if (this.oauthService.hasValidAccessToken()) {
            console.log('require login', jwtDecode(this.oauthService.getAccessToken()));
            return true;
        } else {
            this.router.navigateByUrl('/login');
        }
    }
}

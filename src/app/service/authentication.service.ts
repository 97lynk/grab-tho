import { Injectable } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject, of, throwError, BehaviorSubject } from 'rxjs';
import { authConfig } from '../util/auth.config';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OAuth2Client as OAuth2 } from '@byteowls/capacitor-oauth2';
import { registerWebPlugin, Plugins } from '@capacitor/core';
import * as jwtDecode from 'jwt-decode';
const { OAuth2Client } = Plugins;
const fbApiVersion = '2.11';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private subject = new BehaviorSubject<any>(null);

    constructor(
        private oauthService: OAuthService,
        private http: HttpClient) {

        registerWebPlugin(OAuth2);

        console.log('constructor auth service');

        // set up OAuth service
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.setStorage(localStorage);

        // logging stored token
        this.loggingCurrentToken();

        if (this.oauthService.hasValidAccessToken()) {
            this.loadProfile();
        } else if (this.oauthService.getRefreshToken() !== null) {
            this.refreshToken();
        }

        // handle all event relate token
        this.oauthService.events.subscribe(e => {
            console.log('Oauth/oidc Event', e);
            // refresh token then load profile
            switch (e.type) {
                case 'token_expires':
                    console.log('OAuth2: refresh new token request');
                    this.oauthService.refreshToken()
                        .then(value => {
                            console.log('OAuth2: refresh new token success');
                            this.loadProfile();
                        })
                        .catch(error => {
                            console.log('OAuth2: refresh new token failed', error);
                            this.oauthService.logOut();
                        });
                    break;
                case 'user_profile_loaded':
                    this.loadProfile();
                    break;
                case 'logout':
                    this.publishChangeProfile(null);
            }
        });


    }

    publishChangeProfile = (profile: any) => {
        if (JSON.stringify(profile) === JSON.stringify(this.subject.value)) return;
        this.subject.next(profile);
    };

    registerSubscriber = (): Observable<any> => this.subject.asObservable();

    async refreshToken() {
        this.oauthService.refreshToken().then(data => {
            console.log('OAuth2: refresh new token success');
            this.loadProfile();

        }).catch(error => {
            console.log('OAuth2: refresh new token failed ', error);
        });
    }

    async refreshTokenWithoutLoadProfile() {
        return this.oauthService.refreshToken();
    }

    loadProfile = () => {
        console.log('OAuth2: load profile request');
        // contains access token and valid
        if (this.oauthService.hasValidAccessToken()) {
            console.log('OAuth2: token still valid');
            // already exist claims
            if (this.oauthService.getIdentityClaims()) {
                this.publishChangeProfile(this.oauthService.getIdentityClaims());
                console.log('OAuth2: load profile success (extract from claim token)');
            } else {
                this.oauthService.loadUserProfile().then(profile => {
                    this.publishChangeProfile(profile);
                    console.log('OAuth2: load profile success (request api)');
                }).catch(error => console.log(`OAuth2: load profile failed (${error})`));
            }
        } else {
            console.log('OAuth2: load profile failed (token is invalid)');
        }
    }

    async loginWithUsernameAndPassword(username: string, password: string) {
        console.log('OAuth2: request login');
        await this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password);
    }

    async loginWithFacebook() {
        const resourceUrlResponse = await this.facebookLogin();
        console.log(resourceUrlResponse);
        const accessToken = await this.http.post(`${environment.serviceUrl}/login/facebook?token=${resourceUrlResponse['access_token']}`,
            {}).toPromise();
        localStorage.setItem('refresh_token', accessToken['refresh_token']);
    }

    private facebookLogin() {
        return OAuth2Client.authenticate({
            appId: environment.fbAppId,
            authorizationBaseUrl: `https://www.facebook.com/v${fbApiVersion}/dialog/oauth`,
            accessTokenEndpoint: `https://graph.facebook.com/v${fbApiVersion}/oauth/access_token`,
            resourceUrl: `https://graph.facebook.com/v${fbApiVersion}/me`,
            web: {
                redirectUrl: `${environment.redirectUri}`,
                windowOptions: 'height=600,left=0,top=0'
            },
            android: {
                customHandlerClass: 'com.companyname.appname.YourAndroidFacebookOAuth2Handler',
            },
            ios: {
                customHandlerClass: 'App.YourIOsFacebookOAuth2Handler',
            }
        });
    }

    logout = () => {
        this.oauthService.logOut(false);
    }

    isAuthenticated = () => this.oauthService.hasValidAccessToken();

    loggingCurrentToken = () => {
        console.log(`OAuth2: Access token is exist(${this.oauthService.getAccessToken() != null})`);
        console.log(`OAuth2:      expire: ${(new Date(this.oauthService.getAccessTokenExpiration()).toLocaleTimeString())}`);
        console.log(`OAuth2:       valid: ${this.oauthService.hasValidAccessToken()}`);
        console.log(`OAuth2: Refresh token is exist(${this.oauthService.getRefreshToken() != null})`);
    }

    isClient() {
        const roles = jwtDecode(this.oauthService.getAccessToken()).authorities as string[];
        console.log('roles ', roles);
        return roles.includes('ROLE_CUSTOMER');
    }

    valid = () => this.oauthService.hasValidAccessToken() + ' ' + (this.oauthService.getAccessTokenExpiration() - Date.now());

    registerAccount(username: string, email: string, password: string) {
        return this.http.post(`${environment.serviceUrl}/accounts`, {
            username, email, password
        });
    }
}

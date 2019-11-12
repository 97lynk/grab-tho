import { AuthConfig, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

const apiHost = environment.serviceUrl;

export const authConfig: AuthConfig = {
    clientId: 'clientIdPassword',
    dummyClientSecret: '123',
    tokenEndpoint: `${apiHost}/oauth/token`,
    userinfoEndpoint: `${apiHost}/accounts/me`,
    logoutUrl: '/login',
    loginUrl: '/login',
    showDebugInformation: true,
    scope: '',
    useHttpBasicAuthForPasswordFlow: true,
    oidc: false,
    requireHttps: environment.authSsl
};


export const urlsAuth: OAuthModuleConfig = {
    resourceServer: {
        allowedUrls: [
            `${apiHost}/requests`,
            `${apiHost}/accounts`,
            `${apiHost}/repairers`,
            `${apiHost}/histories`
        ],
        sendAccessToken: true,
    }
};

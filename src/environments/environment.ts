// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  redirectUri: 'http://localhost:8100',
  serviceUrl: 'http://localhost:8080',
  // serviceUrl: 'https://grabtho.tk',
  authSsl: false,
  tag: 'dev',
  fbAppId: '1153417668380667',
  firebase: {
    apiKey: 'AIzaSyBDc2yRxjlk0RyAp2utPQU5pv3eEmSEntE',
    authDomain: 'motel-242404.firebaseapp.com',
    databaseURL: 'https://motel-242404.firebaseio.com',
    projectId: 'motel-242404',
    storageBucket: 'motel-242404.appspot.com',
    messagingSenderId: '1057320092912',
    appId: '1:1057320092912:web:9547c36138d417b2f32e35',
    measurementId: 'G-8708DW0VS2',
    vapidKey: 'BO9CR3msZHQiVuhiCQMyTaqmdvt2mxdeYivo1Ha-GpCIf_ik6BT011ykjA0ACYbhJLYYJnilV9zUhVow726-Hic'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

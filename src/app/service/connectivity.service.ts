import { Injectable, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

declare var Connection;
@Injectable({
    providedIn: 'root'
})
export class ConnectivityService implements OnInit {

    onDevice: boolean;

    conneted = false;

    constructor(public platform: Platform, private network: Network) {
        this.onDevice = this.platform.is('cordova');
    }

    ngOnInit(): void {
        this.network.onConnect().subscribe(() => {
            // console.log('network connected!');
            this.conneted = true;
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            setTimeout(() => {
                if (this.network.type === 'wifi') {
                    // console.log('we got a wifi connection, woohoo!');
                }
            }, 3000);
        });


        this.network.onDisconnect().subscribe(() => this.conneted = false);
    }

    isOnline(): boolean {
        if (this.onDevice && this.conneted) {
            return true;
        } else {
            return navigator.onLine;
        }
    }

    isOffline(): boolean {
        if (this.onDevice && !this.conneted) {
            return true;
        } else {
            return !navigator.onLine;
        }
    }
}
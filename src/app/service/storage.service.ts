import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as CapacitorSQLPlugin from 'capacitor-data-storage-sqlite';

import { Plugins } from '@capacitor/core';
const { CapacitorDataStorageSqlite, Capacitor } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    storage: any = {};

    constructor() {
        console.log('platform ', Capacitor.platform);
        if (Capacitor.platform === 'ios' || Capacitor.platform === 'android') {
            this.storage = CapacitorDataStorageSqlite;
        } else {
            this.storage = CapacitorSQLPlugin.CapacitorDataStorageSqlite;
        }
    }

    async save(key: string, value: any) {
        return this.storage.set({ key, value });
    }

    async get(key: string) {
        return (await this.storage.get({ key })).value;
    }

    async remove(key: string) {
        return this.storage.remove({ key });
    }
}

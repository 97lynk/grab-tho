import { Subscription } from 'rxjs';

export class GarbageCollector {

    subscriptions: { name: string, sub: Subscription }[];

    constructor() {
        this.subscriptions = [];
    }

    collect(name: string, sub: Subscription) {
        if (this.subscriptions.find(s => s.name === name)) {
            sub.unsubscribe();
            return;
        }

        this.subscriptions.push({ name, sub });
    }

    clearAll() {
        this.subscriptions.forEach(s => s.sub.unsubscribe());
        this.subscriptions = [];
    }

} 
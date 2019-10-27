import { Component, OnInit, Input } from '@angular/core';
import { RecentRequest } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'item-request',
    templateUrl: 'request.item.html'
})
export class RequestItem implements OnInit {

    ngOnInit(): void {

    }

    imageHost = imageHost;

    @Input() data: RecentRequest;

    constructor() { }
}

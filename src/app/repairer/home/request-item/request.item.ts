import { Component, OnInit, Input } from '@angular/core';
import { RecentRequest } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';
import { AlertController } from '@ionic/angular';
import { History } from 'src/app/dto/history';
import { Profile } from 'src/app/dto/profile';

@Component({
    selector: 'item-request',
    templateUrl: 'request.item.html'
})
export class RequestItem implements OnInit {


    imageHost = imageHost;

    @Input('request') data: RecentRequest;

    @Input() history: History;

    ngOnInit(): void { }

    constructor() { }
}

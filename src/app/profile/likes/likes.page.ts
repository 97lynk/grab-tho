import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RequestService } from 'src/app/service/request.service';
import { GarbageCollector } from 'src/app/util/garbage.collector';
import { Repairer } from 'src/app/dto/repairer';
import { Page } from 'src/app/dto/page';
import { LikeService } from 'src/app/service/like.service';
import { Profile } from 'src/app/dto/profile';
import { AuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit, OnDestroy {

  gc = new GarbageCollector('Repairer/Tabs/Profile/Histories');

  users: { fullName: string, likeAt: number, username: string, repairer: string }[] = [];

  isRepairer = true;

  @Input() profile: Profile;

  constructor(
    private likeService: LikeService,
    private modalController: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isRepairer = !this.authService.isClient();
    this.gc.collect('requestService.getRequestOfRepairer',
      this.likeService.getLiker(this.profile.username).subscribe((data: any[]) => {
        // console.log('data  >>> ', data);
        this.users = data.map(d => d.payload.val());
      }));
  }

  close() {
    this.modalController.dismiss({
      status: 'CLOSE'
    });
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
  }
}

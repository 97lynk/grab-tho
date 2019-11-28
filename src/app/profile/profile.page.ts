import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { GarbageCollector } from 'src/app/util/garbage.collector';
import { NavController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { Profile } from 'src/app/dto/profile';
import { AuthService } from 'src/app/service/authentication.service';
import { LikeService } from 'src/app/service/like.service';
import { BehaviorSubject } from 'rxjs';
import { RepairerService } from 'src/app/service/repairer.service';
import { Repairer } from 'src/app/dto/repairer';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { ToastButton } from '@ionic/core';
import { TransactionHistoriesPage } from './transaction-histories/transaction-histories.page';
import { ReviewsPage } from './reviews/reviews.page';
import { LikesPage } from './likes/likes.page';
import { ChangeAvatarPage } from './change-avatar/change-avatar.page';
import { SettingPage } from './setting/setting.page';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class RepairerProfilePage implements OnInit, OnDestroy, AfterViewInit {

  gc = new GarbageCollector();

  profile: Profile;

  repairer: Repairer;

  counter = new BehaviorSubject<number>(0);

  isRepairer = false;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private repairerService: RepairerService,
    private likeService: LikeService,
    private authService: AuthService,
    public navController: NavController,
    private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {

    console.log('ngOnit tab3 ');
    this.counter = this.likeService.counter;

    this.gc.collect('profile', this.authService.registerSubscriber().subscribe(p => {
      if (!p) return;
      this.profile = p;
      this.likeService.countLike(this.profile.username, '');
      this.isRepairer = !this.authService.isClient();
      if (this.isRepairer)
        this.gc.collect('repairer',
          this.repairerService.getRepairer(this.profile.id).subscribe((r: Repairer) => this.repairer = r));
    }))
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
  }

  ionViewWillEnter() {
    const { setting } = this.activatedRoute.snapshot.queryParams;
    if (setting === 'open')
      this.gc.collect('profile', this.authService.registerSubscriber().subscribe(p => {
        if (!p) return;
        this.profile = p;
        this.showSetting();
      })
      );
  }

  async ngAfterViewInit() {
  }

  logout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }

  async showEditInfo() {
    const data = {
      profile: { ...this.profile },
      repairer: { ...this.repairer }
    };
    const editModal = await this.modalController.create({
      component: EditProfilePage,
      componentProps: data
    });

    const toast = await this.toastController.create({
      message: 'Thông cá nhân đã được thay đổi',
      duration: 5000,
      position: 'top',
      buttons: [
        {
          side: 'end',
          text: 'Xong',
          role: 'cancel',
        }
      ]
    });

    editModal.onDidDismiss().then(modalData => {
      if (modalData.data && modalData.data.status === 'SUCCESS') {
        this.profile = data.profile;
        toast.present();
      }
    });
    editModal.present();
  }

  async showTransHistories() {
    const transModal = await this.modalController.create({
      component: TransactionHistoriesPage,
      componentProps: {
        repairerId: this.profile.id
      }
    });
    transModal.present();
  }

  async showReviews() {
    let repairer = { id: this.profile.id };
    if (this.repairer) {
      repairer = this.repairer;
      repairer.id = this.profile.id;
    }

    const reviewsModal = await this.modalController.create({
      component: ReviewsPage,
      componentProps: { repairer }
    });
    reviewsModal.present();
  }

  async showLikes() {
    const likesModal = await this.modalController.create({
      component: LikesPage,
      componentProps: { profile: this.profile }
    });
    likesModal.present();
  }

  async showRechargePopup() {
    const rechargeAlert = await this.alertController.create({
      header: 'Nhập mã thẻ nạp',
      subHeader: 'Mã thẻ gồm 12 chữ số',
      inputs: [
        {
          name: 'code',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Đồng ý',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await rechargeAlert.present();
  }

  async showChangeAvatar() {
    const data = {
      profile: { ...this.profile },
      repairer: (this.isRepairer ? { ...this.repairer } : null)
    };

    const toast = await this.toastController.create({
      message: 'Thông cá nhân đã được thay đổi',
      duration: 5000,
      position: 'top',
      buttons: [
        {
          side: 'end',
          text: 'Xong',
          role: 'cancel',
        }
      ]
    });

    const changeAvatarModal = await this.modalController.create({
      component: ChangeAvatarPage,
      componentProps: data
    });


    changeAvatarModal.onDidDismiss().then(modalData => {
      if (modalData.data && modalData.data.status === 'SUCCESS') {
        this.profile = data.profile;
        toast.present();
      }
    });
    changeAvatarModal.present();
  }

  async showSetting() {
    const toast = await this.toastController.create({
      message: 'Cài đặt đã được thay đổi',
      duration: 5000,
      position: 'top',
      buttons: [
        {
          side: 'end',
          text: 'Xong',
          role: 'cancel',
        }
      ]
    });

    const settingModal = await this.modalController.create({
      component: SettingPage, componentProps: {
        profile: { ...this.profile }
      }
    });

    settingModal.onDidDismiss().then(modalData => {
      if (modalData.data && modalData.data.status === 'SUCCESS') {
        this.authService.forceLoadProfile();
        toast.present();
      }
    });

    settingModal.present();
  }
}

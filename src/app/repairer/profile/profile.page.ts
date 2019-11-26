import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { GarbageCollector } from 'src/app/util/garbage.collector';
import { NavController, ModalController, ToastController } from '@ionic/angular';
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
import { HistoriesPage } from './histories/histories.page';



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

  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private repairerService: RepairerService,
    private likeService: LikeService,
    private authService: AuthService,
    public navController: NavController) {
  }

  async ngOnInit() {
    console.log('ngOnit tab3');
    this.counter = this.likeService.counter;

    this.gc.collect('profile', this.authService.registerSubscriber().subscribe(p => {
      if (!p) return;
      this.profile = p;
      this.likeService.countLike(this.profile.username, '');
      this.gc.collect('repairer',
        this.repairerService.getRepairer(this.profile.id).subscribe((r: Repairer) => this.repairer = r));
    }))
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
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
    const transModal = await this.modalController.create({ component: TransactionHistoriesPage });
    transModal.present();
  }

  async showReviews() {
    const repairer = this.repairer;
    repairer.id = this.profile.id;
    const reviewsModal = await this.modalController.create({
      component: ReviewsPage,
      componentProps: { repairer }
    });
    reviewsModal.present();
  }

  async showHistories() {
    const repairer = this.repairer;
    repairer.id = this.profile.id;
    const historiesModal = await this.modalController.create({
      component: HistoriesPage,
      componentProps: { repairer }
    });
    historiesModal.present();
  }

}

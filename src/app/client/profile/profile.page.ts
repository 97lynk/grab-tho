import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AuthService } from '../../service/authentication.service';
import { Profile } from '../../dto/profile';
import { GarbageCollector } from 'src/app/util/garbage.collector';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ClientProfilePage implements OnInit, OnDestroy, AfterViewInit {

  gc = new GarbageCollector();

  profile: Profile;

  constructor(
    private authService: AuthService,
    public navController: NavController) {
  }

  async ngOnInit() {
    // console.log('ngOnit tab3');
    this.gc.collect('profile', this.authService.registerSubscriber().subscribe(p => this.profile = p))
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

}

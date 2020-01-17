import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {animateFunc} from '../services/route-animations';
import {SharedDataService} from '../services/shared-data.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    animateFunc
  ]
})
export class AppComponent {
  title = 'zp-chrome-extension';

  constructor( public shared: SharedDataService, private storage: StorageService ) {
    this.getCurrentMode();
  }

  async getCurrentMode() {
    this.shared.mode = (await this.storage.getAccountPublicData()).accounts[0].public_details.meta.mode;
  }

  prepareRoute( outlet: RouterOutlet ) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}

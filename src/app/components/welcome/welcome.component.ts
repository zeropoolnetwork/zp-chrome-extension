import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor( private storage: StorageService,
               private activatedRoute: ActivatedRoute,
               private router: Router ) {
    try {
      const operation = this.activatedRoute.snapshot.params.operation;
      this.routerNavigation(operation);
    } catch (e) {
      this.routerNavigation();
    }

  }

  async routerNavigation( operation?: string ) {
    if (operation !== 'new') {
      const result = await this.checkExists();
      if (result) {
        await this.router.navigate(['/unlock']);
      }
    }
  }

  async checkExists(): Promise<boolean> {
    let data;
    try {
      data = (await this.storage.getAccountPublicData()).accounts.length;
    } catch (e) {
      data = 0;
    }

    return data !== 0;
  }

  ngOnInit() {
  }

}

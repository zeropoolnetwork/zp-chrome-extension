import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SharedDataService} from '../../services/shared-data.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor( private location: Location,
               public shared: SharedDataService) {
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}

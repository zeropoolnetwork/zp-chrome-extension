import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {SharedDataService} from '../../../services/shared-data.service';

@Component({
  selector: 'app-send-confirm',
  templateUrl: './send-confirm.component.html',
  styleUrls: ['./send-confirm.component.scss']
})
export class SendConfirmComponent implements OnInit {

  sum: string;

  constructor(private location: Location, private shared: SharedDataService) {
    this.sum = this.shared.sum;
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }
}

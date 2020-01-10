import { Component, OnInit } from '@angular/core';
import {from} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {toShortAddress} from '../header/header.component';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentAddress: string;
  currentName: string;

  constructor(private storage: StorageService) {
    from(this.storage.getAccountPublicData()).pipe(
      map((data) => {
        this.currentName = data.accounts[0].public_details.name;
        this.currentAddress = toShortAddress(data.accounts[0].public_details.addresses[0].value);
      }),
      take(1)
    ).subscribe();
  }

  ngOnInit() {
  }

}


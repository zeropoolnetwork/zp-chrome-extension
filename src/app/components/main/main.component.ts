import { Component, OnInit } from '@angular/core';
import {from} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {toShortAddress} from '../header/header.component';
import {StorageService} from '../../services/storage.service';
import {ClipboardService} from '../../services/clipboard.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentAddress: string;
  currentAddressShort: string;
  currentName: string;
  copyMessage = 'Copy address';

  constructor(private storage: StorageService, private clipboard: ClipboardService) {
    from(this.storage.getAccountPublicData()).pipe(
      map((data) => {
        this.currentName = data.accounts[0].public_details.name;
        this.currentAddressShort = toShortAddress(data.accounts[0].public_details.addresses[0].value);
        this.currentAddress = data.accounts[0].public_details.addresses[0].value;
      }),
      take(1)
    ).subscribe();
  }

  ngOnInit() {
  }

  copyMnemonicToClipboard() {
    this.clipboard.copyToClipboard(this.currentAddress);
    this.copyMessage = 'Copied';
  }
}


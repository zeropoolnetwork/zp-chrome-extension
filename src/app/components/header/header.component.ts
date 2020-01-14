import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {from} from 'rxjs';
import {map, take} from 'rxjs/operators';

export function toShortAddress(address: string): string {
  return address.substring(0, 8) + '...' + address.substring(address.length - 8, address.length);
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


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

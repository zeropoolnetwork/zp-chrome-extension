import { Component, OnInit } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {toShortAddress} from '../header/header.component';
import {StorageService} from '../../services/storage.service';
import {ClipboardService} from '../../services/clipboard.service';
import {SharedDataService} from '../../services/shared-data.service';
import {EthereumService} from '../../services/ethereum.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentAddress: string;
  currentAddressShort: string;
  currentName: string;
  copyMessage = 'Copy addressTo';
  balance$: Observable<any>;

  constructor(private storage: StorageService,
              private clipboard: ClipboardService,
              public shared: SharedDataService,
              private ethS: EthereumService) {
    from(this.storage.getAccountPublicData()).pipe(
      map((data) => {
        this.currentName = data.accounts[0].public_details.name;
        if (data.accounts[0].public_details.meta.mode === 'zeropool') {
          const zrpAddress =  data.accounts[0].public_details.addresses.find( x => x.currency === 'zrp').value;
          this.currentAddressShort = toShortAddress(zrpAddress);
          this.currentAddress = zrpAddress;
        } else if (data.accounts[0].public_details.meta.mode === 'ethereum') {
          const ethAddress =  data.accounts[0].public_details.addresses.find( x => x.currency === 'eth').value;
          this.currentAddressShort = toShortAddress(ethAddress);
          this.currentAddress = ethAddress;
          this.ethS.initBalance(this.shared.addresses.find(x => x.currency === 'eth').value);
          this.balance$ = this.ethS.bal$;
          // this.shared.interval4000.subscribe(() => {
          //   this.balance$ = this.ethS.getEthBalance(this.shared.addresses.find(x => x.currency === 'eth').value);
          // });
        }
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

  async toggleMode() {
    const pubData = await this.storage.getAccountPublicData();
    if (this.shared.mode === 'zeropool') {
      this.shared.mode = 'ethereum';
      await this.storage.changeAccountMode('ethereum');
      const ethAddress =  pubData.accounts[0].public_details.addresses.find( x => x.currency === 'eth').value;
      this.currentAddressShort = toShortAddress(ethAddress);
      this.currentAddress = ethAddress;
      this.ethS.initBalance(ethAddress);
      this.balance$ = this.ethS.bal$;
    } else if (this.shared.mode === 'ethereum') {
      this.shared.mode = 'zeropool';
      await this.storage.changeAccountMode('zeropool');
      const zrpAddress =  pubData.accounts[0].public_details.addresses.find( x => x.currency === 'zrp').value;
      this.currentAddressShort = toShortAddress(zrpAddress);
      this.currentAddress = zrpAddress;
      this.balance$.subscribe().unsubscribe();
      this.balance$ = of(0);

      // this.shared.interval4000.subscribe(() => {
      //   this.balance$ = this.ethS.getEthBalance(this.shared.addresses.find(x => x.currency === 'eth').value);
      // });
    }
  }
}


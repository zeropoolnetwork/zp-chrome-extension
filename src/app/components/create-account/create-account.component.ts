import {Component, OnInit} from '@angular/core';
import {HdWalletService} from '../../services/hd-wallet.service';
import {ClipboardService} from '../../services/clipboard.service';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import {Router} from '@angular/router';
import {SharedDataService} from '../../services/shared-data.service';

/** Custom options the configure the tooltip's default show/hide delays. */
export const toolTip: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 1000,
  touchendHideDelay: 5000,

};

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: toolTip}
  ],
})
export class CreateAccountComponent implements OnInit {

  mnemonic: string;
  theCheckbox = false;
  copyMessage = 'Copy mnemonic';
  isDisabled = true;

  constructor( private clipboard: ClipboardService,
               private router: Router,
               private shared: SharedDataService
  ) {
    try {
      if (this.shared.mnemonic.length > 0) {
        this.mnemonic = this.shared.mnemonic;
      } else {
        this.mnemonic = HdWalletService.generateMnemonic();
      }
    } catch (e) {
        this.mnemonic = HdWalletService.generateMnemonic();
    }
  }

  copyMnemonicToClipboard() {
    this.clipboard.copyToClipboard(this.mnemonic);
    this.copyMessage = 'Copied';
  }

  onKeydown( event ) {
    if (event.key === 'Enter') {
      this.next();
    }
  }

  next() {
    if (this.theCheckbox) {
      // this.alert.showError('Please, confirm that you have copied mnemonic', 'Error');
      return;
    }
    this.shared.mnemonic = this.mnemonic;
    this.router.navigate(['/password']);
  }

  ngOnInit() {
  }

  flip() {
    this.isDisabled = !this.isDisabled;
  }
}

import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../../services/shared-data.service';
import {ClipboardService} from '../../services/clipboard.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-mnemonic',
  templateUrl: './show-mnemonic.component.html',
  styleUrls: ['./show-mnemonic.component.scss']
})
export class ShowMnemonicComponent implements OnInit {

  mnemonic: string;
  copyMessage = 'Copy mnemonic';
  constructor( private shared: SharedDataService, private clipboard: ClipboardService, private router: Router) {
    if (this.shared.mnemonic)  {
    this.mnemonic = this.shared.mnemonic;
    } else {
      this.router.navigate(['/password/decrypt']);
    }
  }

  ngOnInit() {
  }

  copyMnemonicToClipboard() {
    this.clipboard.copyToClipboard(this.mnemonic);
    this.copyMessage = 'Copied';
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HdWalletService} from '../../services/hd-wallet.service';
import {SharedDataService} from '../../services/shared-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-import-account',
  templateUrl: './import-account.component.html',
  styleUrls: ['./import-account.component.scss']
})
export class ImportAccountComponent implements OnInit {

  isDisabled = true;
  mnemonicFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private shared: SharedDataService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onKeydown( event ) {
    if (event.key === 'Enter') {
      this.next();
    }
  }

  next() {
    if (this.isDisabled) {
      // this.alert.showError('Please, confirm that you have copied mnemonic', 'Error');
      return;
    }
    this.shared.mnemonic = this.mnemonicFormControl.value;
    this.router.navigate(['/password']);
  }

  validate(phrase: string) {
    console.log(HdWalletService.validateMnemonic(phrase))
    this.isDisabled = !HdWalletService.validateMnemonic(phrase);
  }


}

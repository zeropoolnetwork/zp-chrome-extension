import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {SharedDataService} from '../../services/shared-data.service';
import {StorageService} from '../../services/storage.service';
import {AccountsPrivate, PrivateAccountDetails} from '../../models/storage.model';
import {EncryptionNativeService} from '../../services/encryption-native.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  isDisabled = true;
  operation: string;
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor( private router: Router,
               private shared: SharedDataService,
               private activatedRoute: ActivatedRoute,
               private location: Location,
               private storage: StorageService) {

    this.operation = this.activatedRoute.snapshot.params.operation;
    console.log(this.shared.mnemonic)
    if (this.operation === 'registration' && !this.shared.mnemonic) {
      this.router.navigate(['/']);
    }
  }

  async onKeydown( event ) {
    if (event.key === 'Enter' && this.operation === 'registration') {
      this.next();
    } else if (event.key === 'Enter' && this.operation === 'decrypt') {
      await this.proccessMnemonic();
    }
  }

  next() {
    if (this.passwordFormControl.value.length <= 7) {
      // this.alert.showError('Please, confirm that you have copied mnemonic', 'Error');
      return;
    }
    this.shared.password = this.passwordFormControl.value;

    this.router.navigate(['/repeat']);
  }

  ngOnInit() {
  }

  flip() {
    this.isDisabled = !this.isDisabled;
  }

  async tryToDecrypt(): Promise<string> {
    const accountsPrivate = await this.storage.getAccountPrivateData(this.passwordFormControl.value);
    if (accountsPrivate.accounts.length > 0) {
      return accountsPrivate.accounts[0].private_details.mnemonic;
    }
  }

  async proccessMnemonic() {
     const mnemonic = await this.tryToDecrypt();
     if (mnemonic) {
       this.shared.mnemonic = mnemonic;
       this.router.navigate(['/mnemonic']);
     } else {
       this.alertUnsuccessful();
     }
  }

  alertUnsuccessful() {
    alert('bad password');
  }

  back() {
    this.location.back();
  }
}

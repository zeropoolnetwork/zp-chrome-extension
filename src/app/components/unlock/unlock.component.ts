import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {StorageService} from "../../services/storage.service";
import {SharedDataService} from "../../services/shared-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.scss']
})
export class UnlockComponent implements OnInit {

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor( private storage: StorageService,
              private shared: SharedDataService,
               private router: Router ) { }

  onKeydown( event ) {
    if (event.key === 'Enter') {
    }
  }

  ngOnInit() {
  }

  async tryUnlock(password: string) {
      const accounts = await this.storage.getAccountPrivateData(password);
      if (accounts.accounts.length > 0) {
        this.shared.mnemonic = accounts.accounts[0].private_details.mnemonic;
        await this.router.navigate(['/main']);
      } else {
        alert('bad password');
      }
  }
}

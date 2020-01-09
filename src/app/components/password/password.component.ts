import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {SharedDataService} from "../../services/shared-data.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  isDisabled = true;
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor( private router : Router, private shared : SharedDataService ) {
  }

  onKeydown( event ) {
    if (event.key === 'Enter') {
      this.next();
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


}

import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SharedDataService} from '../../services/shared-data.service';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Component({
  selector: 'app-repeat-password',
  templateUrl: './repeat-password.component.html',
  styleUrls: ['./repeat-password.component.scss']
})
export class RepeatPasswordComponent implements OnInit {

  isDisabled = true;
  password = new BehaviorSubject('');

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    // this.RepeatPasswordValidator()
  ]);

  constructor( private router: Router, private shared: SharedDataService ) {
    try {
      if (this.shared.password.length > 0) {
        this.password.next(this.shared.password);
      } else {
        this.router.navigate(['/password']);
      }
    } catch (e) {
      this.router.navigate(['/password']);
    }
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

    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

  checkThatPasswordIsCorrect(currentValue: string) {
     currentValue === this.password.getValue() ?  this.isDisabled = false : this.isDisabled = true;
  }

  // todo: make async validator for password
  RepeatPasswordValidator(control: AbstractControl, password: BehaviorSubject<string>): Observable<{[key: string]: boolean}> | null {
    if (control.value === 0 || control.value === null) {
      return of({repeat: true});
    }
    if (control.value.length > 0) {
      console.log(control.value !== this.password.getValue());
      return of({repeat: control.value !== this.password.getValue()});
    }
    return null;
  }
}

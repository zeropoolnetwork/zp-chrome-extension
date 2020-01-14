import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {SharedDataService} from './shared-data.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private shared: SharedDataService, private router: Router) { }

  canActivate(): Observable<boolean> {
    const mnemonic = this.shared.mnemonic;
    if (mnemonic === undefined) {
      this.router.navigate(['/welcome/usual']);
      return of(false);
    }
    return of(true);
  }
}

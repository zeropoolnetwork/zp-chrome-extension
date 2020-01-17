import { Injectable } from '@angular/core';
import {Addresses, PrivateKeys} from '../models/storage.model';
import {interval, Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  mnemonic: string;
  password: string;
  sum: string;
  addressTo: string;
  mode = 'zeropool';
  addresses: Addresses[];
  keys: PrivateKeys[];

  interval4000: Observable<any>;
  constructor() {
    this.interval4000 = interval(4000);
  }
}

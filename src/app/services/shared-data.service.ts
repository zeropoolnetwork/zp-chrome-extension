import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  mnemonic: string;
  password: string;

  constructor() { }
}

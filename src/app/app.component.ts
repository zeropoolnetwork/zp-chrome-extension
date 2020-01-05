import { Component } from '@angular/core';
import { Privkey, Pubkey } from 'hdwallet-babyjub';
import { generateMnemonic } from 'bip39';
import {RouterOutlet} from '@angular/router';
import {newSlider} from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    newSlider
  ]
})
export class AppComponent {
  title = 'zp-chrome-extension';

  constructor() {
    const someMnemonic = generateMnemonic();
    const obj1 = Privkey('shiver box little burden auto early shine vote dress symptom plate certain course open rely', "m/44'/0'/0'/0/0");
    const obj2 = Privkey(someMnemonic, "m/44'/0'/0'/0/0");
    debugger
  }

  sayHi() {
    console.log('Hi');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

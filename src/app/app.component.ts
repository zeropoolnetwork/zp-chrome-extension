import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zp-chrome-extension';
  constructor() {
    // debugger
  }

  sayHi() {
    console.log('Hi');
    debugger
  }
}

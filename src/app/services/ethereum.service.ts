import {Injectable} from '@angular/core';
import {from, Observable, of, Subscription, timer} from 'rxjs';
import {ethers} from 'ethers';
import {fr} from 'ethers/wordlists';
import {catchError, map, shareReplay, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  walletInstance: boolean;
  sub: Subscription;
  bal$: Observable<number>;
  constructor() {

  }

  // initService( privKey: string ) {
  //   const provider = ethers.getDefaultProvider();
  //   this.walletInstance = new ethers.Wallet( privKey, provider);
  // }

  initBalance( address: string ) {
    if (!this.walletInstance) {
      this.walletInstance = true;
      this.bal$ = timer(0, 4000).pipe(
        switchMap(() => {
          return this.getEthBalance(address);
        }),
        catchError(() => {
          return of(NaN);
        }),
        shareReplay(1)
      );
      this.sub = this.bal$.subscribe();
    }
  }


  getEthBalance( address: string ): Observable<any> {
    const provider = ethers.getDefaultProvider();
    return from(provider.getBalance(address)).pipe(
      map(( data ) => {
        console.log('init')
        return ethers.utils.formatEther(data);
      })
    );
  }
}

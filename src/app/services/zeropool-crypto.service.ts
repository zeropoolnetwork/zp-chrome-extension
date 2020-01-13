import { Injectable } from '@angular/core';

export const zrpPath = 'm/44\'/0\'/0\'/0/0';

@Injectable({
  providedIn: 'root'
})
export class ZeropoolCryptoService {

  constructor() { }

  getPrivateKey(mnemonic: string, path: string = zrpPath): any {
    // @ts-ignore
    return (window as any).HDWallet.Privkey(mnemonic, path);
  }

  getPublicKey(mnemonic: string, path: string = zrpPath): any {
    // @ts-ignore
    const publicKey = (window as any).HDWallet.Pubkey(mnemonic, path);
    // @ts-ignore
    return publicKey.K[0];
  }

  getAddress(pubkey: string): any {
    // @ts-ignore
    return `zp:${pubkey}`;
  }

}

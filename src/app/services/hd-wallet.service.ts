import { Injectable } from '@angular/core';
import { entropyToMnemonic, mnemonicToSeedSync } from 'bip39';
import { hasStrongRandom, uint8ArrayToHex } from './hd-wallet.utils';
import { EnDict } from './wordlist.en';
const numWords = 12;

@Injectable({
  providedIn: 'root'
})
export class HdWalletService {
  private readonly words: string;

  constructor() {}

  static generateMnemonic(): string {
    if (!hasStrongRandom()) {
      alert('This browser does not support strong randomness');
      return;
    }

    // get the amount of entropy (bits) to use
    const strength = numWords / 3 * 32;

    // words | strength
    // 12   -> 128 bit / 16 bytes
    // 15   -> 160 bit / 20 bytes
    // 18   -> 192 bit / 24 bytes
    // 21   -> 224 bit / 28 bytes
    // 24   -> 256 bit / 32 bytes
    const b = new Uint8Array(strength / 8);
    const entropy = crypto.getRandomValues(b);

    return entropyToMnemonic(uint8ArrayToHex(entropy), EnDict);
  }
}

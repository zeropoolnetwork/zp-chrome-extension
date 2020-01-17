import {Injectable} from '@angular/core';
import {mnemonicToSeedSync} from 'bip39';
import * as bip32 from 'bip32';
import {BIP32Interface} from 'bip32';
import {publicToAddress, addHexPrefix, toChecksumAddress} from 'ethereumjs-util';

export const ethPath = 'm/44\'/60\'/0\'/0';

@Injectable({
  providedIn: 'root'
})
export class EthereumCryptoService {

  constructor() {
  }

  getPrivateKey( mnemonic: string, path: string = ethPath ): string {
    const keyPair = this.generateSecp256k1KeyPair(mnemonic, path);
    return keyPair.privateKey.toString('hex');
  }

  getPublicKey( mnemonic: string, path: string = ethPath ): any {
    const keyPair = this.generateSecp256k1KeyPair(mnemonic, path);
    return keyPair.publicKey.toString('hex');
  }

  getAddress( pubkey: string ): string {
    const pubkeyBuffer = global.Buffer.from(pubkey, 'hex');
    const addressBuffer = publicToAddress(pubkeyBuffer, true);
    const hexAddress = addressBuffer.toString('hex');
    return addHexPrefix(toChecksumAddress(hexAddress));
  }

  private generateSecp256k1KeyPair( mnemonic, path: string, index: number = 0 ): BIP32Interface {
    const seed = mnemonicToSeedSync(mnemonic, '');
    const bip32RootKey = bip32.fromSeed(seed);
    const bip32ExtendedKey = this.calcBip32ExtendedKey(bip32RootKey, path);
    return bip32ExtendedKey.derive(index);
  }

  private calcBip32ExtendedKey( extendedKey: BIP32Interface, path: string ) {
    // Derive the key from the path
    const pathBits = path.split('/');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < pathBits.length; i++) {
      const bit = pathBits[i];
      const index = parseInt(bit, 10);
      if (isNaN(index)) {
        continue;
      }

      const hardened = bit[bit.length - 1] === '\'';
      const isPrivate = !(extendedKey.isNeutered());
      const invalidDerivationPath = hardened && !isPrivate;
      if (invalidDerivationPath) {
        extendedKey = null;
      } else if (hardened) {
        extendedKey = extendedKey.deriveHardened(index);
      } else {
        extendedKey = extendedKey.derive(index);
      }
    }
    return extendedKey;
  }
}

import {Injectable} from '@angular/core';
import {
  Currencies,
  Addresses,
  PrivateKeys,
  DerivationPaths,
  AccountPublic,
  AccountPrivate,
  AccountsPrivate,
  AccountsPublic,
  PrivateAccountDetails,
  PublicAccountDetails
} from '../models/storage.model';
import {ZeropoolCryptoService, zrpPath} from './zeropool-crypto.service';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {EncryptionNativeService} from './encryption-native.service';

// tslint:disable-next-line:variable-name
const default_name = 'Account 1';

interface AllAccounts {
  priv: AccountsPrivate;
  pub: AccountsPublic;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private lsSetter$: Subject<string> = new Subject<string>();

  constructor( private zrp: ZeropoolCryptoService, private crypto: EncryptionNativeService ) {
  }

  public async createDefaultAccount( mnemonic: string, password: string ) {
    await this.setToStorageAll(this.initAllStorageData(mnemonic), password);
  }

  public async getAccountPublicData(): Promise<AccountsPublic> {
    let data: AccountsPublic;
    try {
      data = JSON.parse(await this.getFromStorageRaw('public'));
    } catch (e) {
      data = {accounts: []};
    }
    return Promise.resolve(data);
  }

  public async getAccountPrivateData( password: string ): Promise<AccountsPrivate> {
    const data = await this.getFromStorageRaw('private');

    let result: AccountsPrivate;
    try {
      const rawResult = await this.crypto.decrypt(data, password);
      result = JSON.parse(rawResult);
    } catch (e) {
      result = {accounts: []};
    }
    return result;
  }

  private initAllStorageData( mnemonic: string ): AllAccounts {
    const availableCurrencies: Currencies = {
      currenciesList: ['zrp']
    };

    // tslint:disable-next-line:variable-name
    const derivation_path: DerivationPaths = {
      currency: availableCurrencies.currenciesList[0],
      value: zrpPath
    };

    const address: Addresses = {
      currency: availableCurrencies.currenciesList[0],
      value: this.zrp.getAddress(
        this.zrp.getPublicKey(
          mnemonic,
          derivation_path.value
        )
      )
    };

    // tslint:disable-next-line:variable-name
    const private_key: PrivateKeys = {
      currency: availableCurrencies.currenciesList[0],
      value: this.zrp.getPrivateKey(
        mnemonic,
        derivation_path.value
      ).toString()
    };

    // tslint:disable-next-line:variable-name
    const private_keys: PrivateKeys[] = [];
    private_keys.push(private_key);

    // tslint:disable-next-line:variable-name
    const addresses: Addresses[] = [];
    addresses.push(address);

    // tslint:disable-next-line:variable-name
    const derivation_paths: DerivationPaths[] = [];
    addresses.push(derivation_path);

    // tslint:disable-next-line:variable-name
    const private_details: PrivateAccountDetails = {
      mnemonic,
      private_keys
    };

    // tslint:disable-next-line:variable-name
    const public_details: PublicAccountDetails = {
      name: default_name,
      addresses,
      availableCurrencies,
      derivation_paths,
      meta: {},
    };

    const account: AccountPrivate = {
      private_details
    };

    // tslint:disable-next-line:variable-name
    const account_pub: AccountPublic = {
      public_details
    };

    // tslint:disable-next-line:variable-name
    const accounts_pub: AccountPublic[] = [];
    accounts_pub.push(account_pub);

    // tslint:disable-next-line:variable-name
    const accounts_priv: AccountPrivate[] = [];
    accounts_priv.push(account);

    const pub: AccountsPublic = {
      accounts: accounts_pub
    };

    const priv: AccountsPrivate = {
      accounts: accounts_priv
    };
    return {pub, priv};
  }

  addAccount( mnemonic, currency, newCurrency?, derivationPath?, meta? ) {
    if (newCurrency && derivationPath) {

    } else {

    }
  }

  private async setToStorageAll( rawData: AllAccounts, password: string ) {
    const privateData = JSON.stringify(rawData.priv);
    const publicData = JSON.stringify(rawData.pub);

    // todo: check for errors
    const encryptedData = await this.crypto.encrypt(privateData, password);

    await this.saveToStorageRaw('private', encryptedData);
    await this.saveToStorageRaw('public', publicData);
  }

  private saveToStorageRaw( key: string, value: string ): Promise<void> {
    return new Promise<void>(( resolve ) => {
      if (environment.production) {
        const cmd = {
          [key]: value
        };
        chrome.storage.local.set(cmd, resolve);
      } else {
        localStorage.setItem(key, value);
        // Fire our fake localstorage listener
        this.lsSetter$.next(value);
        resolve();
      }
    });
  }

  private getFromStorageRaw( key: string ): Promise<string> {
    return new Promise<any>(( resolve ) => {
      if (environment.production) {
        chrome.storage.local.get(key, ( result ) => resolve(result[key]));
      } else {
        const result = localStorage.getItem(key);
        resolve(result);
      }
    });
  }

}

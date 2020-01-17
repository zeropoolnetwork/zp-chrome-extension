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
import {EthereumCryptoService, ethPath} from './ethereum-crypto.service';

// tslint:disable-next-line:variable-name
const default_name = 'Account 1';

interface AllAccounts {
  priv: AccountsPrivate;
  pub: AccountsPublic;
}

interface Account {
  priv: AccountPrivate;
  pub: AccountPublic;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private lsSetter$: Subject<string> = new Subject<string>();

  constructor(private zrp: ZeropoolCryptoService,
              private eth: EthereumCryptoService,
              private crypto: EncryptionNativeService) {
  }

  public async createDefaultAccount(mnemonic: string, password: string) {
    await this.setToStorageAll(this.initAllStorageData(mnemonic), password);
  }

  public async changeAccountMode(mode: string) {
    const currentPub = await this.getAccountPublicData();
    currentPub.accounts[0].public_details.meta = {mode};
    await this.saveToStorageRaw('public', JSON.stringify(currentPub));
  }

  // TODO: In case storage is empty this function returns `null`
  public async getAccountPublicData(): Promise<AccountsPublic> {
    try {
      // TODO: HERE is a problem
      return JSON.parse(await this.getFromStorageRaw('public'));
    } catch (e) {
      // TODO: move default object to constant
      return {
        accounts: []
      };
    }
  }

  public async getAccountPrivateData(password: string): Promise<AccountsPrivate> {
    const data = await this.getFromStorageRaw('private');

    let result: AccountsPrivate;
    try {
      // TODO: HERE might be a problem, but not for sure
      const rawResult = await this.crypto.decrypt(data, password);
      result = JSON.parse(rawResult);
    } catch (e) {
      // TODO: move default object to constant
      result = {
        accounts: []
      };
    }
    return result;
  }

  private initAllStorageData(mnemonic: string): AllAccounts {

    const availableCurrencies: Currencies = {
      currenciesList: ['zrp', 'eth']
    };


    const derivation_path_zrp: DerivationPaths = {
      currency: availableCurrencies.currenciesList[0],
      value: zrpPath
    };

    const derivation_path_eth: DerivationPaths = {
      currency: availableCurrencies.currenciesList[1],
      value: ethPath
    };

    const address_zrp: Addresses = {
      currency: availableCurrencies.currenciesList[0],
      value: this.zrp.getAddress(
        this.zrp.getPublicKey(
          mnemonic,
          derivation_path_zrp.value
        )
      )
    };

    const address_eth: Addresses = {
      currency: availableCurrencies.currenciesList[1],
      value: this.eth.getAddress(
        this.eth.getPublicKey(
          mnemonic,
          derivation_path_eth.value
        )
      )
    };

    const private_key_zrp: PrivateKeys = {
      currency: availableCurrencies.currenciesList[0],
      value: this.zrp.getPrivateKey(
        mnemonic,
        derivation_path_zrp.value
      ).k.toString()
    };

    const private_key_eth: PrivateKeys = {
      currency: availableCurrencies.currenciesList[1],
      value: this.eth.getPrivateKey(
        mnemonic,
        derivation_path_zrp.value
      ).toString()
    };

    // console.log(private_key);

    const private_keys: PrivateKeys[] = [];
    private_keys.push(private_key_zrp);
    private_keys.push(private_key_eth);

    const addresses: Addresses[] = [];
    addresses.push(address_zrp);
    addresses.push(address_eth);


    const derivation_paths: DerivationPaths[] = [];
    derivation_paths.push(derivation_path_zrp);
    derivation_paths.push(derivation_path_eth);

    const private_details: PrivateAccountDetails = {
      mnemonic,
      private_keys
    };

    const public_details: PublicAccountDetails = {
      name: default_name,
      addresses,
      availableCurrencies,
      derivation_paths,
      meta: {'mode': 'zeropool'},
    };

    const account: AccountPrivate = {
      private_details
    };

    const account_pub: AccountPublic = {
      public_details
    };

    const accounts_pub: AccountPublic[] = [];
    accounts_pub.push(account_pub);

    const accounts_priv: AccountPrivate[] = [];
    accounts_priv.push(account);

    const pub: AccountsPublic = {
      accounts: accounts_pub
    };

    const priv: AccountsPrivate = {
      accounts: accounts_priv
    };

    return {
      pub,
      priv
    };
  }

  async removeAccount() {
    await this.cleanStorageRaw('current_priv');
    await this.cleanStorageRaw('current_pub');
    await this.cleanStorageRaw('public');
    await this.cleanStorageRaw('private');
  }

  addAccount(mnemonic, currency, newCurrency?, derivationPath?, meta?) {
    if (newCurrency && derivationPath) {

    } else {

    }
  }

  private async setToStorageAll(rawData: AllAccounts, password: string) {
    const privateData = JSON.stringify(rawData.priv);
    const publicData = JSON.stringify(rawData.pub);

    // todo: check for errors
    const encryptedData = await this.crypto.encrypt(privateData, password);

    await this.saveToStorageRaw('private', encryptedData);
    await this.saveToStorageRaw('public', publicData);
  }

  private async setToStorageCurrentAccount(rawData: Account, password: string) {
    const privateData = JSON.stringify(rawData.priv);
    const publicData = JSON.stringify(rawData.pub);

    // todo: check for errors
    const encryptedData = await this.crypto.encrypt(privateData, password);

    await this.saveToStorageRaw('current_private', encryptedData);
    await this.saveToStorageRaw('current_public', publicData);
  }


  private saveToStorageRaw(key: string, value: string): Promise<void> {
    return new Promise<void>((resolve) => {
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

  private getFromStorageRaw(key: string): Promise<string> {
    return new Promise<any>((resolve) => {
      if (environment.production) {
        chrome.storage.local.get(key, (result) => resolve(result[key]));
      } else {
        const result = localStorage.getItem(key);
        resolve(result);
      }
    });
  }

  private cleanStorageRaw(key: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (environment.production) {
        chrome.storage.local.remove(key);
      } else {
        localStorage.removeItem(key);
        // Fire our fake localstorage listener
        this.lsSetter$.next(key);
        resolve();
      }
    });
  }

}

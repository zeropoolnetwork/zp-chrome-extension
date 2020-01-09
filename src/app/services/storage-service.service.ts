import {Injectable} from '@angular/core';
import {
  Currencies,
  Addresses,
  PrivateKeys,
  DerivationPaths,
  PrivateAccountDetails,
  PublicAccountDetails, AccountPublic, AccountPrivate, AccountsPrivate, AccountsPublic
} from '../models/storage.model';
import {ZeropoolCryptoService, zrpPath} from './zeropool-crypto.service';

// tslint:disable-next-line:variable-name
const default_name = 'Account 1';
interface AllAccounts {
  priv: AccountsPrivate;
  pub: AccountsPublic;
}

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor( private zrp: ZeropoolCryptoService ) {
  }

  initAllStorageData( mnemonic: string ): AllAccounts {
    const availableCurrencies: Currencies = {
      currenciesList: ['zrp']
    };

    const privateCurrencyMap = new Map();
    const addressCurrencyMap = new Map();
    const currencyDerivationPathsMap = new Map();

    currencyDerivationPathsMap.set(availableCurrencies.currenciesList[0], zrpPath);

    privateCurrencyMap.set(
      availableCurrencies.currenciesList[0],
      this.zrp.getPrivateKey(
        mnemonic,
        currencyDerivationPathsMap.get(availableCurrencies.currenciesList[0])
      )
    );

    addressCurrencyMap.set(
      availableCurrencies.currenciesList[0],
      this.zrp.getAddress(
        this.zrp.getPublicKey(
          mnemonic,
          zrpPath
        )
      )
    );

    const addresses: Addresses = {
      currencyMap: addressCurrencyMap
    };

    // tslint:disable-next-line:variable-name
    const private_keys: PrivateKeys = {
      currencyMap: privateCurrencyMap
    };

    // tslint:disable-next-line:variable-name
    const derivation_paths: DerivationPaths = {
      currencyDerivationPathsMap
    };

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

  addAccount(mnemonic, currency, newCurrency?, derivationPath?, meta?) {
    if (newCurrency && derivationPath) {

    } else {

    }
  }

  getData(mnemonic) {

  }

  renameAccount() {}

  deleteAccount() {}

  setToStorageAll(rawData: AllAccounts) {
     const privateData = JSON.stringify(rawData.priv);
     const publicData = JSON.stringify(rawData.pub);

  }

  getFromStorage() {
  }

  updateStorage() {
  }

  removeStorage() {
  }
}

export interface AccountsPublic {
  accounts: AccountPublic[];
}

// TODO: it seems nest field is no needed
export interface AccountsPrivate {
  accounts: AccountPrivate[];
}

// TODO: it seems nest field is no needed
export interface AccountPrivate {
  private_details: PrivateAccountDetails;
}

export interface AccountPublic {
  public_details: PublicAccountDetails;
}

export interface PublicAccountDetails {
  name: string;
  addresses: Addresses[];
  derivation_paths: DerivationPaths[];
  availableCurrencies: Currencies;
  meta: any;
}

export interface PrivateAccountDetails {
  mnemonic: string;
  private_keys: PrivateKeys[];
}

export interface Addresses {
  currency: string;
  value: string;
}

export interface PrivateKeys {
  currency: string;
  value: string;
}

export interface DerivationPaths {
  currency: string;
  value: string;
}

export interface Currencies {
  currenciesList: string[];
}

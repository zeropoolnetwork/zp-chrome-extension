export interface AccountsPublic {
  accounts: AccountPublic[];
}

export interface AccountsPrivate {
  accounts: AccountPrivate[];
}

export interface AccountPrivate {
  private_details: PrivateAccountDetails;
}

export interface AccountPublic {
  public_details: PublicAccountDetails;
}

export interface PublicAccountDetails {
  name: string;
  addresses: Addresses;
  derivation_paths: DerivationPaths;
  availableCurrencies: Currencies;
  meta: any;
}

export interface PrivateAccountDetails {
  mnemonic: string;
  private_keys: PrivateKeys;
}

export interface Addresses {
  currencyMap: Map<string, string>;
}

export interface PrivateKeys {
  currencyMap: Map<string, string>;
}

export interface DerivationPaths {
  currencyDerivationPathsMap: Map<string, string>;
}

export interface Currencies {
  currenciesList: string[];
}

export interface SteamId {
  BIsClanAccount(): boolean;

  BIsIndividualAccount(): boolean;

  BIsValid(): boolean;

  ConvertTo64BitString(): string;

  GetAccountID(): number;

  GetAccountType(): number;

  GetInstance(): number;

  GetUniverse(): number;

  Render(): string;

  SetAccountID(accountId: number): void;

  SetAccountType(accountType: number): void;

  SetFromComponents(accountId: number, instance: number, accountType: number, universe: number): void;

  SetInstance(instance: number): void;

  SetUniverse(universe: number): void;

  m_ulSteamID: Long;
}

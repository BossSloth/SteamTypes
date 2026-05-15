export interface RootMessage {
  value?: string;
}

export interface Container {
  message?: RootMessage;

  messages?: RootMessage[];
}

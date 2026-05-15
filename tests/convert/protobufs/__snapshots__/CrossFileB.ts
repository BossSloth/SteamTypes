import { OtherShared, SharedKind, SharedMessage } from './cross-file-a';

export interface Consumer {
  kind?: SharedKind;

  local?: string;

  other?: OtherShared;

  shared?: SharedMessage;
}

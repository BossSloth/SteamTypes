import { ClientNotificationType, NotificationTargets } from 'Global/stores/NotificationTargets';
import { SerializedArrayBuffer } from 'shared/protobuf';
import { Unregisterable } from './shared';

export interface Notifications {
  RegisterForNotifications<T extends ClientNotificationType>(
    callback: (
      notificationIndex: number,
      type: T,
      data: SerializedArrayBuffer<NotificationTargets[T]>,
    ) => void,
  ): Unregisterable;
}

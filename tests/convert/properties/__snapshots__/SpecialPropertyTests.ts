import { ProtobufClass } from 'shared/protobuf';

export interface SpecialPropertyTests {
  notificationTargets: NotificationTargets;
}

export interface NotificationTargets {
  1: CClientNotificationDataNotificationTarget;

  2: CServerNotificationDataNotificationTarget;
}

export interface CClientNotificationDataNotificationTarget {
  /**
   * This value is an enum
   * @currentValue 0
   */
  eFeature: number;

  proto: ProtobufClass<CClientNotificationData>;

  sound: number;
}

export interface CServerNotificationDataNotificationTarget {
  /**
   * This value is an enum
   * @currentValue 1
   */
  eFeature: number;

  proto: ProtobufClass<CServerNotificationData>;

  sound: number;
}

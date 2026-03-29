/* eslint-disable @stylistic/quotes */
class ProtoBuf1 {
  static toObject() {
    return {};
  }

  static fromObject() {
    return new ProtoBuf1();
  }

  static deserializeBinary() {
    return new ProtoBuf1();
  }

  getClassName() {
    return "CClientNotificationData";
  }
}

class ProtoBuf2 {
  static toObject() {
    return {};
  }

  static fromObject() {
    return new ProtoBuf2();
  }

  static deserializeBinary() {
    return new ProtoBuf2();
  }

  getClassName() {
    return "CServerNotificationData";
  }
}

const notificationTargets = {
  1: { eFeature: 0, sound: 6, proto: ProtoBuf1 },
  2: { eFeature: 1, sound: 7, proto: ProtoBuf2 },
};

export const specialPropertyTests = {
  notificationTargets,
};


export interface RootObject<T> {
  status: number;
  info: string;
  data: T;
}

export interface WxConfig {
  jsapiticket: string;
  signature: string;
  appid: string;
  url: string;
  noncestr: string;
  timestamp: string;
}


export interface RedpacketProfile {
  id: number;
  recordId: string;
  promoterNickName: string;
  promoterAvatarUrl: string;
  promoterId: string;
  activityId: number;
  title: string;
  merchantName: string;
  merchantLogo: string;
  url: string;
  shareUrl: string;
  shareDesc: string;
  status: number;
  createTime: Date;
  updateTime: Date;
}


export interface AfterReceivePacket {
  id: number;
  unionId: string;
  nickName: string;
  avatarUrl: string;
  day: string;
  promoteRecordId: string;
  amount: number;
  createTime: Date;
}



export interface User {
  id: number;
  unionId: string;
  nickName: string;
  avatarUrl: string;
  day: string;
  promoteRecordId: string;
  amount: number;
  createTime: Date;
}

export interface ListUser {
  welfareCount: number;
  totalCount: number;
  list: User[];
}

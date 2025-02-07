import { invoke } from "../../functions/jsBrige";

export interface IUserInfo {
  appToken: string; // appToken
  authStatus: 0 | 1; // 实名状态：0->未实名，1->已实名
  avatar: string;
  emToken: string; // 环信emToken
  firstLogin: boolean;
  phoneNumber: string;
  registerType: 1 | 2 | 3 | 4; // 注册类型：1->手机登录注册，2->微信登录注册，3->苹果登录注册，4->QQ登录注册
  teenModeSwitch: 1 | 0;
  userId: number;
  userName: string;
  userType: 1 | 2; // 用户类型：1-用户，2-主播
}

// 获取用户信息
export const getUserInfo = () => {
  return invoke<{ time: number }, IUserInfo>('getUserInfo', { time: Date.now() });
};

export default {
  getUserInfo,
};

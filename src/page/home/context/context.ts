import { useLoadBridge } from "@/hooks/useLoadBridge";
import { createContext, useContext } from "react";

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

// export const UserInfoContext = createContext<IUserInfo | null>(null);
// export const useUserInfo = () => useContext(UserInfoContext);

// /**
//  * 赋值用户信息
//  */
// export const SetUserInfoContext = createContext<(res: IUserInfo) => void>(
//   () => undefined
// );
// export const useChangeUserInfo = () => useContext(SetUserInfoContext);

// 应用信息
export interface IAppInfo {
  appVersion: string;
  deviceId: string;
  deviceName: string;
  deviceType: number;
  systemVersion: string;
  statusBarHeight: number; // 34
  navigationBarHeight: number;
  safeAreaInsetBottom: number; // 44
}
export const DeviceInfoContext = createContext<IAppInfo | null>(null);
export const useDeviceInfo = () => useContext(DeviceInfoContext);

/**
 * 钱包余额
 */
export const BalanceContext = createContext<number>(0);
export const useBalance = () => useContext(BalanceContext);

/**
 * 更改钱包余额
 */
export const UpdateBalanceContext = createContext<(res: number) => void>(
  () => undefined
);
export const useUpdateBalance = () => useContext(UpdateBalanceContext);

/**
 * 直播间信息
 */
export interface RoomDataProps {
  /**
   * 房间id
   */
  roomId: number;
  /**
   * 主播id
   */
  anchorId: number;
}
// export const RoomDataContext = createContext<RoomDataProps | null>(null);
// export const useRoomData = () => useContext(RoomDataContext);

/**js桥加载状态 */
export const BridgeContext = createContext<ReturnType<
  typeof useLoadBridge
> | null>(null);
export const useBridgeStatus = () => useContext(BridgeContext);

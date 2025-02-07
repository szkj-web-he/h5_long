import { invoke, send } from "../../functions/jsBrige";

// 应用信息
export interface IAPPInfo {
  appVersion: string;
  deviceId: string;
  deviceName: string;
  deviceType: number;
  systemVersion: string;
  statusBarHeight: number; // 34
  navigationBarHeight: number;
  safeAreaInsetBottom: number; // 44
}

// 文件上传信息
export interface IUploadFileInfo {
  thumbnailUrl: string; // 缩略图地址
  fileUrl: string; // 文件地址
}

// 获取应用信息
export const getAppInfo = () => {
  return invoke<{ time: number }, IAPPInfo>("getAppInfo", { time: Date.now() });
};

export interface IUploadFileParams {
  accept: "image" | "video";
  filePathType: number; // 文件路径类型：1->头像 2->背景 3->反馈 4->举报
  maxNumber: number;
  fileSize?: number; // 单位（Kb）
  videoTime?: number; // 单位（s）
}

// 上传文件
export const uploadFile = (params: IUploadFileParams) => {
  return invoke<IUploadFileParams, IUploadFileInfo[]>(
    "uploadFile",
    { ...params },
    { timeout: 0 }
  );
};

// 跳转到原生路由
export const navigateNativeRoute = ({ to }: { to: string }) => {
  send("navigateNativeRoute", { to });
};

export interface IGoLiveRoomPageParams {
  /**
   * 主播id
   */
  anchorId: number;

  /**
   * 声网id
   */
  shengwangChannelId: string;

  /**
   * 房间Id
   */
  roomId: number;

  /**
   * 横竖屏
   */
  liveMode: 1 | 2;
  /**
   * 环信ID
   */
  easemobRoomId: string;

  /**
   * 直播间背景图
   */
  liveBackgroundImg: string;
}

/**
 * 跳转到原生的直播间界面
 */
export const goLiveRoomPage = (params: IGoLiveRoomPageParams) => {
  send("enterLiveRoom", { ...params });
};

/**
 * 跳转到原生的用户详情页
 */
export const goUserInfoPage = (userId: number) => {
  send("enterUserMainPage", { userId });
};

// 页面关闭，跳转到原生页面
export const gobBack = () => {
  return send("goBack", { time: Date.now() });
};

// 支付账号添加完成
export const paymentAccountAdded = () => {
  return send("paymentAccountAdded", { time: Date.now() });
};

// 跳转公会入驻申请页面
export const goGuildOccupancyPage = () => {
  return send("goGuildOccupancyPage", { time: Date.now() });
};

/**
 * 调用原生打开一个新webView
 * @linkUrl: 要打开的url
 * @linkType: 跳转类型 0-活动，1-游戏
 */
export const enterAppWebPage = (linkUrl: string, linkType: number) => {
  return send("enterAppWebPage", { linkUrl, linkType, time: Date.now() });
};

/**
 * 获取房间id
 */
export const getRoomId = () => {
  return invoke<
    Record<string, unknown>,
    { roomId: number | null; anchorId: number | null }
  >("getLiveRoomInfo", {});
};

export default {
  getRoomId,
  getAppInfo,
  navigateNativeRoute,
  uploadFile,
  gobBack,
  paymentAccountAdded,
  goGuildOccupancyPage,
  goLiveRoomPage,
  goUserInfoPage,
  enterAppWebPage,
};

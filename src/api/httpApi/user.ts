import { IUserInfo } from "@/page/home/context/context";
import gatewayService, { commonService, IHttpResponse } from "./http";

/**
 * 获取登录验证码
 * */
export const login = ({
  phoneNumber,
  code,
}: {
  phoneNumber: string;
  code: string;
}): Promise<IHttpResponse<IUserInfo>> => {
  return gatewayService.post(`/user/login`, {
    phoneNumber,
    code,
    loginType: 1,
  });
};

/**
 * 玩家信息
 */
export interface IPlayerInfo {
  /**
   * 剩余魔法石
   */
  energy?: number | null;
  /**
   * 剩余优币
   */
  currency?: number | null;
  /**
   * 幸运值
   */
  LuckValue?: number;
  /**
   * 免打扰策略：0不弹 1每次 2每日 3每周 4每月
   */
  pop?: 0 | 1 | 2 | 3 | 4 | null;
}

/**获取玩家信息 */
export const getUserInfo = (): Promise<IHttpResponse<IPlayerInfo>> => {
  return commonService.post(`/logic/getPlayerInfo`);
};

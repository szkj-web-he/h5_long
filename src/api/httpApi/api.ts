/**
 * @file 游戏相关接口
 * @date 2025-01-13
 * @author hexuejie
 * @lastModify hexuejie 2025-01-13
 */

import { commonService, IHttpResponse, orderService } from "./http";

/**
 * 单个中奖概率
 */
export interface IGetProbItem {
  /**
   * 礼物ID
   */
  giftId: number | null;

  /**
   * 礼物昵称
   */
  name: string | null;

  /**
   * 礼物价格
   */
  giftPrice: number | null;

  /**
   * 概率
   */
  prob: number | null;
}

/**
 * 单个游戏中奖内容
 */
export interface IWinningItem {
  /**
   * 礼物id
   */
  giftId: number | null;

  /**
   * 礼物价格
   */
  giftPrice: number | null;

  /**
   * 数量
   */
  num: number | null;

  /**
   * 分成比例
   */
  ratio: number | null;

  /**
   * 礼物图标
   */
  giftIcon: string | null;

  /**
   * 礼物昵称
   */
  name: string | null;
}

/**
 * 单个游戏中奖记录
 */
export interface IWinningHistoryItem {
  /**
   * 中奖时间-时间戳
   */
  time: number | null;
  /**
   * 奖励礼物列表
   */
  giftVos: Array<IWinningItem> | null;
}

/**
 * 单个跑马灯的内容
 */
export interface IMarqueeItem {
  /**
   * 用户id
   */
  userId: number | null;

  /**
   * 头像
   */
  avatar: string | null;

  /**
   * 昵称
   */
  nickname: string | null;

  /**
   * 奖励礼物列表
   */
  giftVos: Array<IWinningItem> | null;
}

/**
 * 抽奖的参数
 */
export interface IToLotteryParams {
  /**
   * 1 => 1连抽
   * 2 => 5连抽
   * 3 => 10连抽
   * 4 => 20连抽
   */
  type: number;

  /**
   * 房间id
   */
  roomId: number;

  /**
   * 主播id
   */
  anchorId: number;
}

/**
 * 游戏中奖概率表
 */
export const getProbList = (): Promise<IHttpResponse<
  Array<IGetProbItem>
> | null> => {
  return orderService({
    url: "/dragon/giftProbList",
    method: "POST",
  });
};

/**
 * 游戏中奖列表
 */
export const getWinningList = (
  pageNum: number
): Promise<
  IHttpResponse<{
    /**
     * 当前分页
     */
    pageNum: number | null;

    /**
     * 总页数
     */
    totalPages: number | null;

    /**
     * 记录
     */
    dragonLotteryVos: Array<IWinningHistoryItem> | null;
  }>
> => {
  return orderService({
    url: "/dragon/lotteryList",
    method: "POST",
    params: {
      pageNum,
    },
  });
};

/**
 * 获取跑马灯列表
 */
export const getMarquee = (): Promise<
  IHttpResponse<Array<IMarqueeItem> | null>
> => {
  return orderService({
    url: "/dragon/marqueeList",
    method: "POST",
  });
};

/**
 * 抽奖
 */
export const toLottery = (
  params: IToLotteryParams
): Promise<
  IHttpResponse<{
    /**
     * 奖励礼物列表
     */
    giftVos: Array<IWinningItem> | null;
    /**
     * 剩余优币
     */
    currency: number | null;
  }>
> => {
  return orderService({
    url: "/dragon/open",
    method: "POST",
    data: params,
  });
};

/**
 * 获取活动规则
 */

export const getActiveRule = (): Promise<
  IHttpResponse<{
    /**
     * 游戏ID
     */
    gameId: number | null;
    /**
     * 游戏规制
     */
    regulation: string | null;
  }>
> => {
  return commonService({
    url: "/logic/getGames",
    method: "POST",
    data: {
      gameType: 111,
    },
  });
};

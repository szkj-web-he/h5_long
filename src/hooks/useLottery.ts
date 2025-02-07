/**
 * @file 去抽奖
 * @date 2025-01-14
 * @author hexuejie
 * @lastModify hexuejie 2025-01-14
 */

import { IWinningItem, toLottery } from "@/api/httpApi/api";
import { RoomDataProps, useUpdateBalance } from "@/page/home/context/context";
import { useState } from "react";

export const useLottery = (): [
  (count: number, roomData: RoomDataProps) => void,
  boolean,
  IWinningItem[] | -1 | null,
  (res: -1) => void
] => {
  /**
   * 请求状态
   */
  const [loading, setLoading] = useState(false);

  /**
   * 获取到的数据
   * -1的时候,为钱包余额不足
   */
  const [list, setList] = useState<IWinningItem[] | -1 | null>(null);

  /**
   * 更改钱包余额的方法
   */
  const changeBalance = useUpdateBalance();

  /**
   * 去抽奖
   */
  const requestLottery = async (type: number, roomData: RoomDataProps) => {
    try {
      setLoading(true);
      const res = await toLottery({
        type,
        roomId: roomData.roomId,
        anchorId: roomData.anchorId,
      });
      if (res.code === 200) {
        setList(res.result.giftVos);
        changeBalance(res.result.currency ?? 0);
        return;
      }

      setList(null);
      console.error("抽奖失败", res);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any)?.["data"]?.["code"] === -213) {
        setList(-1);
        return;
      }
      setList(null);
      console.error("抽奖失败", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 当去抽奖被点击时
   */
  const handlePrayClick = (count: number, roomData: RoomDataProps) => {
    requestLottery(count, roomData);
  };

  /**
   * 将抽奖结果设置为-1
   */
  const changeResult = () => {
    setList(-1);
  };

  return [handlePrayClick, loading, list, changeResult];
};

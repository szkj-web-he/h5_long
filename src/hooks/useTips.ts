/**
 * @file 是否展示提示框
 * @date 2025-01-14
 * @author hexuejie
 * @lastModify hexuejie 2025-01-14
 */

import { IPlayerInfo } from "@/api/httpApi/user";
import { IPopupEvents } from "@/types/types";
import { useRef, useState } from "react";

export const useTips = (
  tipsType?: NonNullable<IPlayerInfo["pop"]>
): [() => void, React.MutableRefObject<IPopupEvents | null>, boolean] => {
  /**
   * 规则弹框
   */
  const tipsEvents = useRef<IPopupEvents | null>(null);

  /**
   * 弹框动画结束动画
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * 获取年月日
   * @param { string | number } time 时间戳
   * @param {  } unit 精确到的最小单位 是 日 / 月
   */
  const transformDateToStr = (
    time?: string | number,
    unit: "month" | "day" = "day"
  ) => {
    let val = undefined;

    if (typeof time === "string") {
      val = Number(time);
    } else {
      val = time;
    }

    if (!val) {
      return undefined;
    }

    const dateVal = new Date(val);

    const y = dateVal.getFullYear();
    const m = dateVal.getMonth();
    if (unit === "day") {
      const d = dateVal.getDate();
      return `${y}-${m}-${d}`;
    }

    if (unit === "month") {
      return `${y}-${m}`;
    }
  };

  /**
   * 判断存在localStorage里的时间戳是否在本周
   */
  const isSameWeek = (time?: string | number) => {
    let val = undefined;

    if (typeof time === "string") {
      val = Number(time);
    } else {
      val = time;
    }

    if (!val) {
      return undefined;
    }

    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth();
    const date = nowDate.getDate(); //天
    const weekVal = nowDate.getDay();

    /**
     * 要到最后一周的话,要加多少天
     */
    const needDay = 6 - weekVal;
    /**
     * 本周的最后一天
     */
    const lastDate = new Date(year, month, date + needDay);

    /**
     * 本周的第一天
     */
    const firstDate = new Date(year, month, date - weekVal);

    /**
     * 存储的时间
     */
    const dateVal = new Date(val);

    const y = dateVal.getFullYear();
    const m = dateVal.getMonth();
    const d = dateVal.getDate();
    const current = new Date(y, m, d);

    return firstDate <= current && current <= lastDate;
  };

  /**
   * 当打开完成后
   */
  const handleOpenOver = () => {
    setIsOpen(true);
    if (tipsType === 0) {
      return;
    }

    const time = localStorage.getItem("lastTime") ?? undefined;
    if (transformDateToStr(time) === transformDateToStr(Date.now())) {
      return;
    }

    if (tipsType === 1 || tipsType === 2) {
      tipsEvents.current?.toOpen();
      return;
    }
    if (tipsType === 3 && !isSameWeek(time)) {
      tipsEvents.current?.toOpen();
      return;
    }
    if (
      transformDateToStr(time, "month") !==
      transformDateToStr(Date.now(), "month")
    ) {
      tipsEvents.current?.toOpen();
      return;
    }
  };
  return [handleOpenOver, tipsEvents, isOpen];
};

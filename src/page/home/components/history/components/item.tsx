/**
 * @file 单个礼物
 * @date 2025-01-14
 * @author hexuejie
 * @lastModify hexuejie 2025-01-14
 */

import { IWinningItem } from "@/api/httpApi/api";

interface ITempProps {
  /**
   * 数据
   */
  item: IWinningItem;
}

function Temp({ item }: ITempProps) {
  return (
    <div className="w-[96px] h-[96px] flex items-center justify-center relative bg-[url('@/assets/img/history-box.png')] bg-contain bg-center bg-no-repeat bg-transparent mt-[16px] mr-[14px]">
      <img
        src={item.giftIcon ?? ""}
        alt=""
        loading="lazy"
        className="max-w-[76px] max-h-[76px]"
      />
      <span className="absolute bottom-0 right-[7px] text-white font-['DINPro'] font-bold z-[1] text-[20px]">
        <span className="historyText relative z-0">X{item.num ?? 1}</span>
        <span className="absolute z-[1] top-0 left-0">X{item.num ?? 1}</span>
      </span>
    </div>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

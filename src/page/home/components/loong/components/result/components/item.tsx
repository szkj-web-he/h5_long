/**
 * @file 单个礼物
 * @date 2025-01-14
 * @author hexuejie
 * @lastModify hexuejie 2025-01-14
 */

import { IWinningItem } from "@/api/httpApi/api";
import clsx from "clsx";

interface ITempProps {
  /**
   * 数据
   */
  item: IWinningItem;
  /**
   * className
   */
  className?: string;
}

function Temp({ item, className }: ITempProps) {
  return (
    <div className={clsx("flex-none mt-[24px] mx-[14px]", className)}>
      <div className="w-[112px] h-[112px] flex items-center justify-center relative bg-[url('@/assets/img/in-box.png')] bg-contain bg-center bg-no-repeat bg-transparent">
        <img
          src={item.giftIcon ?? ""}
          alt=""
          loading="lazy"
          className="max-w-[96px] max-h-[96px]"
        />
        <span className="absolute bottom-0 right-[7px] text-[#973C00] font-['DINPro'] font-bold z-[1] text-[22px]">
          X{item.num ?? 1}
        </span>
      </div>
      <div className="w-[112px] mt-[8px] text-[#FFF6F0] text-[24px] leading-[28px] text-ellipsis whitespace-nowrap overflow-hidden text-center">
        {item.name}
      </div>
    </div>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

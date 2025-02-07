/**
 * @file 礼物展示
 * @date 2025-01-15
 * @author hexuejie
 * @lastModify hexuejie 2025-01-15
 */

import { IWinningItem } from "@/api/httpApi/api";
import BgIcon from "@/assets/img/get-bg.png";
import TittleIcon from "@/assets/img/total-hr.png";
import Item from "./item";
import clsx from "clsx";

interface ITempProps {
  list?: Array<IWinningItem>;
}

function Temp({ list }: ITempProps) {
  const total = (() => {
    let total = 0;
    const arr = list ?? [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const price = (item.giftPrice ?? 0) * (item.num ?? 0);
      total += price;
    }
    return total;
  })();

  return (
    <div className="w-full relative">
      <img src={BgIcon} alt="" loading="lazy" className="w-full" />

      <div className="absolute w-[564px] mx-auto left-0 right-0 top-[252px]">
        <div className="result-title">
          <img alt="" src={TittleIcon} className="mr-[8px] h-[11px]" />
          <span className="font-medium text-[24px]">礼物总价值：</span>
          <span className="font-['DINPro'] text-[28px] font-black">
            {total}
          </span>
          <img
            alt=""
            src={TittleIcon}
            className="ml-[8px] h-[11px] scale-x-[-1] scale-y-[1]"
          />
        </div>
        <div
          className={clsx(
            "flex flex-row flex-wrap items-center justify-center h-[500px]",
            list?.length && list.length <= 4 ? "px-[90px]" : undefined
          )}
        >
          <div
            className={"flex flex-row flex-wrap items-center justify-center"}
          >
            {list?.map((item, index) => {
              return (
                <Item
                  key={index}
                  item={item}
                  className={list.length === 1 ? "scale-[1.8]" : ""}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

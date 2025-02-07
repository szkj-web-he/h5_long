/**
 * @file 祈福
 * @date 2025-01-10
 * @author hexuejie
 * @lastModify hexuejie 2025-01-10
 */

import Button from "@/components/Button";
import clsx from "clsx";

interface ITempProps {
  /**
   * 当去抽奖被点击时
   */
  toPray: (count: number) => void;
  /**
   * 是否禁止点击
   */
  disabled: boolean;
}

function Temp({ toPray, disabled }: ITempProps) {
  return (
    <div className="flex  items-center justify-center absolute bottom-[66px] left-0 w-full z-[12]">
      {[1, 5, 10, 20].map((item, index) => {
        return (
          <Button
            key={item}
            className={clsx(
              "w-[166px] h-[94px] bg-[url('@/assets/img/btn.png')] bg-center bg-contain bg-no-repeat bg-transparent font-['DINPro'] font-black text-[30px] flex items-center justify-center text-white relative",
              index === 0 ? undefined : "ml-[16px]"
            )}
            disabled={disabled}
            onClick={() => {
              toPray(item);
            }}
          >
            <span className="prayText absolute z-0">祈福{item}</span>
            <span className="absolute z-[1]">祈福{item}</span>
          </Button>
        );
      })}
    </div>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

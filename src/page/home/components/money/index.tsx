/**
 * @file 钱
 * @date 2025-01-10
 * @author hexuejie
 * @lastModify hexuejie 2025-01-10
 */

import Icon from "@/assets/img/money.png";
import IconBg from "@/assets/img/money-bg.png";
import IconBubble from "@/assets/img/money-bubble.png";
import { useBalance } from "../../context/context";
import { useEffect, useState } from "react";
import clsx from "clsx";

function Temp() {
  const value = useBalance();
  /**
   * 溢出值
   */
  const [isOverflow, setIsOverflow] = useState(0);

  useEffect(() => {
    const getOverflowStatus = () => {
      const node = document.getElementById("balance");

      if (node) {
        const child = node.getElementsByTagName("div")[0];

        if (child.offsetWidth > node.offsetWidth) {
          setIsOverflow(child.offsetWidth - node.offsetWidth);
        } else {
          setIsOverflow(0);
        }
      } else {
        setIsOverflow(0);
      }
    };
    getOverflowStatus();
    document.fonts.addEventListener("loadingdone", getOverflowStatus);
    return () => {
      document.fonts.removeEventListener("loadingdone", getOverflowStatus);
    };
  }, [value]);

  return (
    <div className="absolute right-[6px] bottom-[188px] z-[10]">
      <img src={IconBg} loading="lazy" alt="" className="w-[112px]" />
      <img
        src={Icon}
        loading="lazy"
        alt=""
        className="w-[68px] animate-spin absolute left-0 right-0 top-0 bottom-0 m-auto z-[1]"
        style={{
          animationDuration: "2.5s",
        }}
      />
      <img
        src={IconBubble}
        loading="lazy"
        alt=""
        className="h-[68px] absolute left-0 right-0 top-0 bottom-0 m-auto z-[2]"
      />
      <div
        className={clsx("w-full flex items-center max-w-full z-[3] absolute", {
          "justify-center": !isOverflow,
        })}
        id="balance"
      >
        <div
          className={
            "bg-[#FF5454] rounded-[34px] px-[8px] font-['DINPro'] text-white leading-[26px] text-[22px] font-bold text-center min-w-[50px] absolute bottom-[5px]"
          }
          style={{
            transform: `translateX(-${isOverflow}px)`,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

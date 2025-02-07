/**
 * @file 反选按钮
 * @date 2025-01-09
 * @author hexuejie
 * @lastModify hexuejie 2025-01-09
 */

import clsx from "clsx";
import CheckIcon from "@/assets/img/check.png";
import Button from "../Button";

interface ICheckProps {
  /**
   * 是否被选中
   */
  status?: boolean;
  /**
   * 当选中状态发生变化的时候
   */
  onClick?: () => void;
  /**
   * 自定义className
   */
  className?: string;
}

function Check({ status, onClick, className }: ICheckProps) {
  return (
    <Button
      className={clsx("w-[28px] h-[28px] relative", className)}
      onClick={onClick}
    >
      <div
        className={clsx(
          "w-full h-full absolute rounded-[50%] border-[2px] border-[#672828]",
          status ? "opacity-0" : "opacity-100"
        )}
      />
      <img
        alt=""
        src={CheckIcon}
        className={clsx(
          "w-full h-full absolute object-contain object-center",
          status ? "opacity-100" : "opacity-0"
        )}
      />
    </Button>
  );
}

export default Check;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

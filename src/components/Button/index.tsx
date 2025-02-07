/**
 * @file 按钮
 * @date 2025-01-09
 * @author hexuejie
 * @lastModify hexuejie 2025-01-09
 */

import clsx from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";

interface ITempProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * 是否禁止点击
   */
  disabled?: boolean;
}

const Temp = forwardRef<HTMLDivElement | null, ITempProps>(
  ({ children, onClick, className, disabled = false, ...props }, ref) => {
    return (
      <div
        onClick={(e) => {
          if (disabled) {
            return;
          }
          const node = e.currentTarget as HTMLDivElement;
          const classListNames = ["scale-x-[0.85]", "scale-y-[0.85]"];
          node?.classList?.add(...classListNames);
          setTimeout(() => {
            node?.classList?.remove(...classListNames);
          }, 110);
          onClick?.(e);
        }}
        className={clsx(className, "cursor-pointer touch-none")}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

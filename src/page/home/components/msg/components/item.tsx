/**
 * @file
 * @date 2025-01-15
 * @author hexuejie
 * @lastModify hexuejie 2025-01-15
 */

import { IMarqueeItem } from "@/api/httpApi/api";
import { Fragment, useEffect, useRef } from "react";

interface ITempProps {
  /**
   * 数据
   */
  item?: IMarqueeItem;
  /**
   * 当动画结束后
   */
  handleAnimateEnd: () => void;
}

function Temp({ item, handleAnimateEnd }: ITempProps) {
  /**
   * 根节点
   */
  const rootRef = useRef<HTMLDivElement | null>(null);

  /**
   * 开始执行动画
   */
  useEffect(() => {
    const node = rootRef.current;

    let timer: null | number = null;

    /**
     * 从整个屏幕的最中间
     * 到屏幕的最左边
     */
    const toLeave = () => {
      const clientWidth = document.body.offsetWidth;
      const offsetWidth = node?.offsetWidth ?? 0;

      const start = clientWidth / 2 - offsetWidth / 2;
      const end = -offsetWidth;
      const moveVal = start - end;
      const moveTime = (moveVal / 20) * 200;
      const newspaperSpinning: Keyframe[] = [
        {
          transform: `translateX(${start}px)`,
        },
        {
          transform: `translateX(${end}px)`,
        },
      ];

      const animateEl = node!.animate(newspaperSpinning, {
        duration: moveTime,
        fill: "forwards",
      });
      animateEl.addEventListener("finish", handleAnimateEnd, {
        once: true,
      });

      /**
       * 取消动画时,直接抛出去结束
       */
      animateEl.addEventListener("cancel", handleAnimateEnd, { once: true });
    };

    /**
     * 文字盒子中间从左滚动右
     */
    const textAnimate = (scrollWidth: number, offsetWidth: number) => {
      const moveVal = scrollWidth - offsetWidth;
      const moveTime = (moveVal / 20) * 500;

      const newspaperSpinning: Keyframe[] = [
        { transform: `translateX(0)` },
        {
          transform: `translateX(-${moveVal}px)`,
        },
      ];

      const childDom = node?.getElementsByClassName("scrollText")[0];
      const animateEl = childDom!.animate(newspaperSpinning, {
        duration: moveTime,
        fill: "forwards",
      });

      animateEl.addEventListener(
        "finish",
        () => {
          if (timer) {
            window.clearTimeout(timer);
          }
          timer = window.setTimeout(() => {
            toLeave();
          }, 1000);
        },
        {
          once: true,
        }
      );
      /**
       * 取消动画时,直接抛出去结束
       */
      animateEl.addEventListener("cancel", handleAnimateEnd, { once: true });
    };

    /**
     * 从整个屏幕的最右遍
     * 到整个屏幕的最中间
     */
    const enter = () => {
      node?.classList.remove("opacity-0");

      const offsetWidth = node?.offsetWidth ?? 0;
      const clientWidth = document.body.offsetWidth;
      const end = clientWidth / 2 - offsetWidth / 2;
      const moveVal = clientWidth - end;
      const moveTime = (moveVal / 20) * 200;
      const newspaperSpinning: Keyframe[] = [
        { transform: `translateX(${clientWidth}px)` },
        {
          transform: `translateX(${end}px)`,
        },
      ];

      const animateEl = node!.animate(newspaperSpinning, {
        duration: moveTime,
        fill: "forwards",
      });

      animateEl.addEventListener(
        "finish",
        () => {
          const childDom = node?.getElementsByClassName(
            "scrollText"
          )[0] as HTMLDivElement;
          const offsetWidth = childDom?.offsetWidth ?? 0;

          const scrollWidth = childDom?.scrollWidth ?? 0;

          if (scrollWidth > offsetWidth) {
            timer = window.setTimeout(() => {
              textAnimate(scrollWidth, offsetWidth);
            }, 500);
            return;
          }
          timer = window.setTimeout(() => {
            toLeave();
          }, 1000);
        },
        {
          once: true,
        }
      );

      /**
       * 取消动画时,直接抛出去结束
       */
      animateEl.addEventListener("cancel", handleAnimateEnd, { once: true });
    };

    if (item && node) {
      timer = window.setTimeout(() => {
        enter();
      });

      return () => {
        if (timer) {
          window.clearTimeout(timer);
        }
      };
    }
  }, [handleAnimateEnd, item]);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="rounded-[72px] opacity-0 inline-block bg-[rgba(0,0,0,0.2)] px-[10px]"
        ref={rootRef}
        key={JSON.stringify(item)}
      >
        <div className="h-[56px] overflow-hidden max-w-[532px]">
          {item ? (
            <div className="flex items-center justify-start flex-nowrap scrollText h-full">
              <div className="w-[36px] h-[36px] rounded-[50%] border-2 border-[#FFFFFF] overflow-hidden mr-[14px] flex-none">
                <img
                  src={item.avatar ?? ""}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="text-[24px] msgText-shadow text-white flex-none text-nowrap flex items-center justify-start flex-nowrap">
                恭喜
                <span className="text-[#FFEA00]">{item.nickname}</span>
                获得
                {item.giftVos?.map((item) => {
                  return (
                    <Fragment key={item.giftId}>
                      {item.giftIcon ? (
                        <>
                          <img
                            src={item.giftIcon ?? ""}
                            className="w-[36px] h-[36px] object-contain mx-[4px]"
                            alt=""
                          />
                          <span className="text-[#FFEA00] font-medium">
                            X{item.num}
                          </span>
                        </>
                      ) : undefined}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

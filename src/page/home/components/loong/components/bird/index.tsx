/**
 * @file 左边的鸟
 * @date 2025-01-13
 * @author hexuejie
 * @lastModify hexuejie 2025-01-13
 */

import { useSvgaPlayer } from "@/hooks/useSvgaPlayer";
import bird from "@/assets/svga/bird.svga?url";
import { memo, useCallback, useEffect, useRef } from "react";
import { Player } from "svgaplayerweb";

function Temp() {
  /**
   * 左边鸟的player
   */
  const leftBirdPlayer = useRef<Player | null>(null);

  /**
   * 右边鸟的player
   */
  const rightBirdPlayer = useRef<Player | null>(null);

  /**
   * 左鸟开始播放的timer
   */
  const timer = useRef<ReturnType<typeof setTimeout>>();

  /**
   * 左鸟 加载成功
   */
  const handleLeftLoadSuccess = useCallback((player?: Player) => {
    leftBirdPlayer.current = player ?? null;

    player?.startAnimation();
  }, []);

  /**
   * 左鸟播放完成后
   */
  const handleLeftFinish = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      rightBirdPlayer.current?.startAnimation();
    }, 2000);
  }, []);

  /**
   * 右鸟 加载成功
   */
  const handleRightLoadSuccess = useCallback((player?: Player) => {
    rightBirdPlayer.current = player ?? null;
  }, []);

  /**
   * 右鸟 播放完成后
   */
  const handleRightFinish = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      leftBirdPlayer.current?.startAnimation();
    }, 2000);
  }, []);

  const leftRef = useSvgaPlayer(
    {
      fillMode: "Backward",
      loops: 1,
      clearsAfterStop: false,
      autoPlay: false,
    },
    bird,
    handleLeftLoadSuccess,
    undefined,
    handleLeftFinish
  );

  const rightRef = useSvgaPlayer(
    {
      fillMode: "Backward",
      loops: 1,
      clearsAfterStop: false,
      autoPlay: false,
    },
    bird,
    handleRightLoadSuccess,
    undefined,
    handleRightFinish
  );

  useEffect(() => {
    return () => {
      leftRef.current = null;
      rightRef.current = null;
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={leftRef}
        className="absolute left-[2px] top-[406px] w-[160px] h-[160px] z-[1]"
      ></div>
      <div
        ref={rightRef}
        className="absolute right-[-22px] top-[544px] w-[160px] h-[160px] scale-y-[1] scale-x-[-1] z-[1]"
      ></div>
    </>
  );
}

export default memo(Temp);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

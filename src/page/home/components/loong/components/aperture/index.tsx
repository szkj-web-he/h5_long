/**
 * @file 播放光圈,和吐火球
 * @date 2025-01-14
 * @author hexuejie
 * @lastModify hexuejie 2025-01-14
 */

import {
  forwardRef,
  memo,
  startTransition,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import ApertureIcon from "@/assets/img/light.png";
import { useSvgaPlayer } from "@/hooks/useSvgaPlayer";
import { Player } from "svgaplayerweb";
import clsx from "clsx";
import explode from "@/assets/mp3/explode.mp3?url";

interface ITempProps {
  /**
   * 播放完成后的回调
   */
  onFinish: () => void;
}

/**
 * 转发播放
 */
export interface IPlayAperture {
  /**
   * 开始播放
   */
  toPlay: () => void;
  /**
   * 隐藏光圈
   */
  toHidden: () => void;
}

const Temp = forwardRef<IPlayAperture, ITempProps>(({ onFinish }, events) => {
  const playerRef = useRef<Player | null>(null);

  /**
   * 音频dom
   */
  const mp3Dom = useRef<HTMLAudioElement | null>(null);
  /**
   * 音频加载状态
   */
  const mp3IsReady = useRef(false);

  /**
   * 当player加载完成后
   */
  const handlePlayerSuccess = useCallback((player?: Player) => {
    playerRef.current = player ?? null;
  }, []);

  /**
   * 参数
   */
  const options = useMemo(() => {
    return {
      loops: 1,
      autoPlay: false,
    };
  }, []);

  /**
   * 调用次数
   */
  const count = useRef({
    finish: 0,
    mp3: 0,
  });
  /**
   * 打开结果弹框
   */
  const openResultModal = useCallback(
    (progress: number) => {
      if (progress * 100 > 40 && !count.current.mp3) {
        ++count.current.mp3;
        mp3Dom.current?.play();
      }

      if (progress * 100 > 60 && !count.current.finish) {
        ++count.current.finish;
        onFinish();
      }
    },
    [onFinish]
  );

  /**
   * 打开结果弹框
   */
  const ref = useSvgaPlayer(
    options,
    "https://zykj-app.oss-cn-beijing.aliyuncs.com/zykj/game/source/loong/svga/spitfire.svga",
    handlePlayerSuccess,
    undefined,
    undefined,
    openResultModal
  );

  /**
   * 是否开始播放
   */
  const [isPlayer, setIsPlayer] = useState(false);

  useImperativeHandle(events, () => {
    return {
      toPlay: () => {
        count.current = {
          finish: 0,
          mp3: 0,
        };
        startTransition(() => {
          setIsPlayer(true);
          if (playerRef.current && mp3IsReady.current) {
            playerRef.current?.startAnimation();
          } else {
            onFinish();
          }
        });
      },
      toHidden: () => {
        setIsPlayer(false);
      },
    };
  });

  useEffect(() => {
    const ele = mp3Dom.current;

    /**
     * mp3加载完成后的回调
     */
    const handleMp3Load = () => {
      if (!ele) {
        return;
      }

      mp3IsReady.current = true;
      ele.muted = false;
      ele.playbackRate = 1.0;
    };

    if (ele) {
      ele.muted = true;
      ele.playbackRate = 3.0;
      ele.play();
      ele.addEventListener("ended", handleMp3Load, {
        once: true,
      });

      ele.addEventListener("error", handleMp3Load, {
        once: true,
      });
    }

    return () => {
      playerRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        className={clsx(
          "absolute z-[0] right-[60px] top-[370px]",
          isPlayer ? "animate-spin" : "hidden"
        )}
        style={{
          animationDuration: isPlayer ? "2s" : undefined,
        }}
      >
        <img
          src={ApertureIcon}
          alt=""
          id="aperture"
          className={clsx(isPlayer ? "aperture" : undefined, "w-[632px]")}
          loading="lazy"
        />
      </div>
      <div
        ref={ref}
        className={clsx(
          "absolute z-[4] w-[750px] h-[1040px] top-[76px] left-0 right-0 mx-auto",
          isPlayer ? undefined : "hidden"
        )}
      />
      <audio ref={mp3Dom}>
        <source src={explode} type="audio/mpeg"></source>
      </audio>
    </>
  );
});

export default memo(Temp);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

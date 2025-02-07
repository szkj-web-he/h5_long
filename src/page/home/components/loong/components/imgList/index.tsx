/**
 * @file 图片轮播
 * @date 2025-01-14
 * @author hexuejie
 * @lastModify hexuejie 2025-01-14
 */

import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export interface ILoongEvents {
  /**
   * 暂停
   */
  toPause: () => void;
  /**
   * 继续播放
   */
  toPlay: () => void;
}

const Temp = forwardRef<ILoongEvents>((_, events) => {
  /**
   * 递增值
   */
  const count = useRef(1);
  /**
   * 当前播放到第几张图片
   */
  const currentIndex = useRef({
    pre: -1,
    current: 0,
  });

  /**
   * 图片加载好的张数
   */
  const [imgLoadNum, setImgLoadNum] = useState(0);

  /**
   * 是否暂停播放
   */
  const [isPause, setIsPause] = useState(false);

  /**
   * 轮播动画
   */
  useEffect(() => {
    const node = document.getElementById("long-wrap");

    const el = node?.getElementsByClassName("long-img");

    if (el?.length) {
      let timer: null | number = null;
      const start = () => {
        if (timer) {
          window.clearTimeout(timer);
        }

        if (isPause) {
          return;
        }
        currentIndex.current.pre = currentIndex.current.current;
        currentIndex.current.current += count.current;
        if (currentIndex.current.current >= imgLoadNum - 1) {
          count.current = -1;
        } else if (currentIndex.current.current <= 0) {
          count.current = 1;
        }
        el[currentIndex.current.pre].classList.add("opacity-0", "invisible");
        el[currentIndex.current.current].classList.remove(
          "opacity-0",
          "invisible"
        );

        timer = window.setTimeout(start, 35);
      };
      if (!isPause && imgLoadNum === 36) {
        timer = window.setTimeout(() => {
          start();
        });
      }

      return () => {
        if (timer) {
          window.clearTimeout(timer);
        }
      };
    }
  }, [isPause, imgLoadNum]);

  useImperativeHandle(events, () => {
    return {
      toPause: () => {
        setIsPause(true);
      },
      toPlay: () => {
        setIsPause(false);
      },
    };
  });

  const imgList = useMemo(() => {
    const arr: string[] = [];
    for (let i = 1; i < 36; i++) {
      const url = `https://zykj-app.oss-cn-beijing.aliyuncs.com/zykj/game/source/loong/images/animationx2/${i}.png`;
      arr.push(url);
    }
    return arr;
  }, []);

  /**
   * 图片加载完成
   */
  const handleImgFinished = () => {
    setImgLoadNum((pre) => {
      return pre + 1;
    });
  };

  return (
    <>
      <img
        className={"w-full absolute top-0 left-0 z-[2] long-img"}
        src={`https://zykj-app.oss-cn-beijing.aliyuncs.com/zykj/game/source/loong/images/animationx2/${0}.png`}
        loading="eager"
        onLoad={handleImgFinished}
        onError={handleImgFinished}
      />
      {imgLoadNum >= 0 ? (
        <>
          {imgList?.map((item) => {
            return (
              <img
                className={
                  "w-full opacity-0 invisible long-img absolute top-0 left-0 z-[2] will-change-[opacity,visibility]"
                }
                key={item}
                src={item}
                onLoad={handleImgFinished}
                onError={handleImgFinished}
                loading="eager"
              />
            );
          })}
        </>
      ) : undefined}
    </>
  );
});

export default memo(Temp);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

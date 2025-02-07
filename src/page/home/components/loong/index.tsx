/**
 * @file 龙动画
 * @date 2025-01-13
 * @author hexuejie
 * @lastModify hexuejie 2025-01-13
 */

import { IWinningItem } from "@/api/httpApi/api";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Bird from "./components/bird";
import Fire from "./components/fire";
import ImgList, { ILoongEvents } from "./components/imgList";
import Aperture, { IPlayAperture } from "./components/aperture";
import ResultModal from "./components/result";

export interface ILotteryEvents {
  /**
   * 开始播放抽奖动画
   * 是否有动画
   */
  toLottery: (isAnimate?: boolean) => void;
}

interface TempProps {
  /**
   * 抽奖结果
   */
  result?: IWinningItem[] | -1;
  /**
   * 请求状态
   */
  loading: boolean;

  /**
   * 动画执行完成后的回调
   */
  onFinish: () => void;
}

const Temp = forwardRef<ILotteryEvents, TempProps>(
  ({ result, loading, onFinish }, events) => {
    /**
     * 图片集的转发事件
     */
    const imgEvents = useRef<ILoongEvents | null>(null);

    /**
     * 光圈动画
     */
    const apertureEvents = useRef<IPlayAperture | null>(null);

    /**
     * 是否打开结果弹框
     */
    const [resultStatus, setResultStatus] = useState(false);

    useImperativeHandle(events, () => {
      return {
        toLottery: (isAnimate = true) => {
          if (isAnimate) {
            apertureEvents.current?.toPlay();
            imgEvents.current?.toPause();
            return;
          }
          setResultStatus(true);
        },
      };
    });

    /**
     * 播放完成后的回调
     */
    const handleAnimateFinish = useCallback(() => {
      imgEvents.current?.toPlay();
      setResultStatus(true);
    }, []);

    return (
      <>
        <div className="absolute top-0 left-0 w-full z-[2]" id="long-wrap">
          <ImgList ref={imgEvents} />
          <Bird />
          <Fire />
          <Aperture onFinish={handleAnimateFinish} ref={apertureEvents} />
        </div>
        <ResultModal
          loading={loading}
          show={resultStatus}
          data={result ?? undefined}
          close={() => {
            apertureEvents.current?.toHidden();
            setResultStatus(false);
            onFinish();
          }}
        />
      </>
    );
  }
);

export default Temp;

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

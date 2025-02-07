import { Popup, SpinLoading, Toast } from "antd-mobile";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SafeAreaInsetBottom from "@/components/SafeAreaInsetBottom";
import Tips from "..//tips";
import nativeApi from "@/api/nativeApi";
import Button from "@/components/Button";
import More from "../more";
import Money from "../money";
import Pray from "../pray";
import Loong, { ILotteryEvents } from "../loong";
import { IPlayerInfo } from "@/api/httpApi/user";
import { useTips } from "@/hooks/useTips";
import { useLottery } from "@/hooks/useLottery";
import { RoomDataProps, useBalance } from "../../context/context";
import Msg from "../msg";

interface TempProps {
  /**
   * 公告的弹框
   */
  tipsType?: NonNullable<IPlayerInfo["pop"]>;
  /**
   * 房间信息
   */
  roomData?: RoomDataProps;
}

function Temp({ tipsType, roomData }: TempProps) {
  const [show, setShow] = useState(false);

  /**
   * 规则弹框
   */
  const [handleOpenOver, tipsEvents, isEndAnimate] = useTips(tipsType);

  /**
   * 去抽奖的事件
   */
  const toLotteryEvents = useRef<ILotteryEvents | null>(null);

  /**
   * 抽奖的相关use
   */
  const [toLotteryFn, loading, list, changeResult] = useLottery();

  /**
   * 动画是否在执行中
   */
  const [isAnimate, setIsAnimate] = useState(false);

  /**
   * 钱包余额
   */
  const balance = useBalance();

  /**
   * 获取钱包和弹框信息
   */
  useEffect(() => {
    if (typeof tipsType === "number") {
      setShow(true);
    }
  }, [tipsType]);

  /**
   * 关闭
   */
  const toClose = () => {
    setShow(false);
  };

  /**
   * 当去抽奖被点击时
   */
  const handlePrayClick = (count: number) => {
    if (loading || isAnimate) {
      return;
    }
    /**
     * 1 => 1连抽
     * 2 => 5连抽
     * 3 => 10连抽
     * 4 => 20连抽
     */
    let type = 0;
    let price = 0;
    switch (count) {
      case 1:
        price = 2000;
        type = 1;
        break;
      case 5:
        price = 10000;
        type = 2;
        break;
      case 10:
        price = 10000;
        type = 3;
        break;
      case 20:
        price = 40000;
        type = 4;
        break;
    }

    if (balance < price) {
      setIsAnimate(true);
      changeResult(-1);
      toLotteryEvents.current?.toLottery(false);
      return;
    }

    if (!roomData?.anchorId || !roomData?.roomId) {
      Toast.show({
        content: "缺少房间信息",
      });
      return;
    }
    setIsAnimate(true);

    toLotteryFn(type, roomData);
    toLotteryEvents.current?.toLottery();
  };

  /**
   * 当抽奖动画结束后,才可以再次点击抽奖
   */
  const handleAnimateFinish = useCallback(() => {
    startTransition(() => {
      setIsAnimate(false);
    });
  }, []);

  return (
    <>
      {tipsType ? undefined : (
        <div className="fixed top-0  left-0 w-full h-full flex items-center justify-center">
          <SpinLoading color="primary" />
        </div>
      )}

      <Popup
        visible={show}
        // onMaskClick={close}
        className="wrap"
        onClose={toClose}
        bodyClassName="pt-[114px] h-[calc(62vh+114px)]"
        afterShow={handleOpenOver}
        afterClose={nativeApi.app.gobBack}
      >
        {/* 弹幕 */}

        {isEndAnimate ? <Msg /> : undefined}
        <div
          className={`w-[572px] h-[218px] bg-center bg-contain bg-transparent bg-no-repeat bg-[url("@/assets/img/title-bg.png")] mx-auto flex justify-center items-end pb-[40px] absolute top-0 left-0 right-0 z-[1]`}
        >
          <div
            className={`bg-[auto_98px] bg-transparent bg-no-repeat bg-[url("https://zykj-app.oss-cn-beijing.aliyuncs.com/zykj/game/source/loong/images/svg/title.svg")] bg-center w-[283px] h-[98px]`}
          />
        </div>
        {isEndAnimate ? (
          <Loong
            ref={toLotteryEvents}
            result={list ?? undefined}
            loading={loading}
            onFinish={handleAnimateFinish}
          />
        ) : undefined}
        <div className="w-full h-full bg-[url('@/assets/img/bg.png')] bg-transparent bg-no-repeat bg-left-top bg-cover absolute z-0" />
        {isEndAnimate ? (
          <div className="w-full h-full relative z-[11] flex flex-col flex-nowrap justify-start items-start">
            <div className="flex-auto w-full relative min-h-0">
              <Button
                className="w-[64px] h-[64px] bg-center bg-contain bg-transparent bg-no-repeat bg-[url('@/assets/img/close-btn.png')] absolute right-[24px] top-0 z-[15]"
                onClick={toClose}
              />
              <More />

              <Money />
              <Pray toPray={handlePrayClick} disabled={loading || isAnimate} />
            </div>
            <SafeAreaInsetBottom />
          </div>
        ) : undefined}
      </Popup>
      <Tips ref={tipsEvents} close={toClose} />
    </>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

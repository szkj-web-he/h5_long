/**
 * @file 结果弹框
 * @date 2025-01-14
 * @author hexuejie
 * @lastModify hexuejie 2025-01-14
 */

import { IWinningItem } from "@/api/httpApi/api";
import { Mask, SpinLoading } from "antd-mobile";
import { createPortal } from "react-dom";
import Button from "@/components/Button";
import NoEnergy from "./components/noEnergy";
import Gifts from "./components/gifts";
import { useLayoutEffect, useState } from "react";
import clsx from "clsx";

interface ITempProps {
  /**
   * 获取到的数据
   */
  data?: Array<IWinningItem> | -1;
  /**
   * 请求状态
   */
  loading: boolean;

  /**
   * 窗口打开状态
   */
  show: boolean;

  /**
   * 关闭
   */
  close: () => void;
}

const Temp = ({ data, loading, show, close }: ITempProps) => {
  /**
   * 进场动画结束后再展示关闭按钮
   */
  const [isPending, setIsPending] = useState(true);
  useLayoutEffect(() => {
    if (!show) {
      setIsPending(true);
    }
  }, [show]);

  const content = () => {
    if (loading) {
      return (
        <div className="py-[100px]">
          <SpinLoading color="primary" />
        </div>
      );
    }
    if (data === -1) {
      return (
        <>
          <NoEnergy toClose={close} />
          <Button
            className={clsx(
              "w-[64px] h-[64px] bg-center bg-contain bg-transparent bg-no-repeat bg-[url('@/assets/img/close-btn.png')]",
              isPending ? "hidden" : undefined
            )}
            onClick={close}
          />
        </>
      );
    }
    return (
      <>
        <Gifts list={data} />
        <Button
          className={clsx(
            "w-[64px] h-[64px] bg-center bg-contain bg-transparent bg-no-repeat bg-[url('@/assets/img/close-btn.png')]",
            isPending ? "hidden" : undefined
          )}
          onClick={close}
        />
      </>
    );
  };

  return createPortal(
    <Mask
      opacity={0.65}
      visible={show}
      className="z-[99999] result-modal"
      onMaskClick={close}
      afterShow={() => {
        setIsPending(false);
      }}
    >
      {content()}
    </Mask>,
    document.body
  );
};
export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

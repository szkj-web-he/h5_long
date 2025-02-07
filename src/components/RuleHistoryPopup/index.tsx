/**
 * @file 游戏规则/我的记录 的通用Popup
 * @date 2025-01-10
 * @author hexuejie
 * @lastModify hexuejie 2025-01-10
 */

import { Popup } from "antd-mobile";
import React from "react";
import Button from "../Button";
import SafeAreaInsetBottom from "../SafeAreaInsetBottom";
import TitleIcon from "@/assets/img/title.png";
import Icon from "@/assets/img/history-bg.png";
import clsx from "clsx";

interface ITempProps {
  /**
   * 打开状态
   */
  show: boolean;
  /**
   * 标题
   */
  title: React.ReactNode;

  /**
   * 子内容
   */
  children?: React.ReactNode;
  /**
   * 关闭
   */
  onClose: () => void;
}

function Temp({ show, title, children, onClose }: ITempProps) {
  return (
    <Popup
      visible={show}
      onMaskClick={onClose}
      className="wrap"
      onClose={onClose}
      bodyClassName="h-[70vh]"
    >
      <Button
        className={clsx(
          "w-[64px] h-[64px] bg-center bg-contain bg-transparent bg-no-repeat bg-[url('@/assets/img/close-btn.png')] absolute right-[24px] top-[-76px] z-[2]",
          {
            ["hidden"]: !show,
          }
        )}
        onClick={onClose}
      />
      <div className="w-full h-[88px] absolute top-0 left-0 z-[1]">
        <img alt="" src={TitleIcon} className="w-full translate-y-[-4px]" />
        <div className="w-full h-full  flex items-center justify-center absolute z-1 top-0 left-0">
          {title}
        </div>
      </div>

      <div className="w-full bg-gradient-to-b from-[#E9912B] to-[#903500] h-full px-[12px] absolute top-0 left-0">
        <div className="bg-gradient-to-b from-[#FFFDF3] to-[#FCF3DB] h-full relative">
          <img
            loading="lazy"
            alt=""
            src={Icon}
            className="w-full absolute bottom-0"
          />
        </div>
      </div>

      <div className="flex-col justify-start items-start flex-nowrap flex relative w-full h-full z-[2] pt-[44px]">
        <div className="w-full h-[44px] flex-none" />
        <div className="flex-auto w-full overflow-hidden">{children}</div>
        <SafeAreaInsetBottom />
      </div>
    </Popup>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

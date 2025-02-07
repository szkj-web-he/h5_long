/**
 * @file U币不足的提示
 * @date 2025-01-15
 * @author hexuejie
 * @lastModify hexuejie 2025-01-15
 */

import { startTransition, useState } from "react";
import Icon from "@/assets/img/insufficient.png";
import YesIcon from "@/assets/img/yes.png";
import Button from "@/components/Button";
import nativeApi from "@/api/nativeApi";
import { Modal } from "antd-mobile";

interface TempProps {
  /**
   * 关闭弹框
   */
  toClose: () => void;
}

function Temp({ toClose }: TempProps) {
  /**
   * 充值弹框
   */
  const [chargeVisible, setChargeVisible] = useState(false);

  /**
   * 去充值
   */
  const handleCharge = async () => {
    toClose();
    startTransition(() => {
      // 1、判断是否为ios环境  2、判断是否有充值套餐
      const isiOS = !!navigator.userAgent.match(
        /\(i[^;]+;( U;)? CPU.+Mac OS X/
      ); //iOS
      if (isiOS) {
        setChargeVisible(true);
        return;
      }
      nativeApi.app.navigateNativeRoute({ to: "customerChargeCenter" });
    });
  };

  return (
    <>
      <div className="w-[566px] relative">
        <img src={Icon} alt="" loading="lazy" className="w-full" />

        <div className="absolute w-full flex flex-col justify-start items-center top-[356px]">
          <div className="text-[#672828] leading-[28px] mb-[58px]">
            优币不足，无法开启！
          </div>

          <Button
            className="w-[220px] h-[72px] flex items-center justify-center relative"
            onClick={handleCharge}
          >
            <img
              alt=""
              src={YesIcon}
              className="absolute top-[0] left-[-2px] h-[78px]"
            />

            <span className="relative z-10 font-semibold text-white text-[28px]">
              同意并进入
            </span>
          </Button>
        </div>
      </div>
      <Modal
        visible={chargeVisible}
        title="苹果充值暂不可用"
        content="请前往“优音APP”官方公众号进行充值"
        closeOnAction
        onClose={() => {
          setChargeVisible(false);
        }}
        getContainer={() => document.body}
        actions={[
          {
            key: "confirm",
            text: "我知道了",
          },
        ]}
      />
    </>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

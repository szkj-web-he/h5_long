import { Mask, Toast } from "antd-mobile";
import { forwardRef, useImperativeHandle, useState } from "react";
import TipsBg from "@/assets/img/tips.png";
import NoIcon from "@/assets/img/no.png";
import YesIcon from "@/assets/img/yes.png";
import Check from "@/components/Check";
import RulePop from "../rulePop";
import Button from "@/components/Button";

interface TempEvents {
  toOpen: () => void;
}

const Temp = forwardRef<TempEvents, { close: () => void }>(
  ({ close }, events) => {
    /**
     * 弹框展开状态
     */
    const [visible, setVisible] = useState(false);

    /**
     * 是否已阅读
     */
    const [isRead, setIsRead] = useState(false);

    /**
     * 今日是否再提示
     */
    const [tipsStatus, setTipsStatus] = useState(false);

    /**
     * 玩法须知的弹框
     */
    const [open, setOpen] = useState(false);

    useImperativeHandle(events, () => {
      return {
        toOpen: () => {
          setVisible(true);
        },
      };
    });

    /**
     * 关闭
     */

    const toClose = () => {
      setVisible(false);
      setTimeout(() => {
        close();
      }, 100);
    };

    /**
     * 进入
     */
    const enter = () => {
      if (!isRead) {
        Toast.show({
          content: "请先阅读并同意《玩法须知和公约》",
          maskStyle: {
            zIndex: 1002,
          },
          maskClassName: "toast-wrap",
          position: "bottom",
        });
        return;
      }

      if (tipsStatus) {
        localStorage.setItem("lastTime", Date.now().toString());
      }
      setVisible(false);
    };

    return (
      <>
        <Mask
          visible={visible}
          color="rgba(0,0,0,0.65)"
          style={{
            zIndex: 1001,
          }}
        >
          <div className="absolute bottom-[76px]">
            <img alt="" src={TipsBg} className="w-[100vw]" loading="lazy" />
            <div className="absolute top-[60px] left-0 z-10 w-full">
              <div className="w-full flex items-center justify-center">
                <div
                  className={`bg-[auto_76px] bg-transparent bg-no-repeat bg-[url("@/assets/svg/tips-title.svg")] bg-center w-[280px] h-[76px]`}
                />
              </div>
              <div className="px-[94px]">
                <div className="text-[#672828] font-medium text-[28px] drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                  守护成长，健康成长
                </div>
                <div className="text-[#672828] text-[24px] text-justify mt-[12px] indent-[2em]">
                  本功能玩法不向未成年人开放，未成年人用户请勿参与。
                </div>
                <div className="text-[#672828] text-[24px] text-justify mt-[12px]">
                  1.
                  本平台玩法均为为提升用户体验设计，任何用户和主播均不得利用平台玩法实施任何违法犯罪的行为或用于任何违法犯罪的用户；
                </div>
                <div className="text-[#672828] text-[24px] text-justify mt-[12px]">
                  2.
                  本平台玩法中获得的礼物和奖励仅限于在平台内消费，禁止主播、主播所在公会、用户及其他第三方主体进行任何形式的背包礼物交易；
                </div>
                <div className="text-[#672828] text-[24px] text-justify mt-[12px]">
                  3.
                  健康游戏，理性消费，如存在上述行为，平台将严格按照平台规则采取相关管理措施；
                </div>

                <div className="text-[24px] leading-[28px] color-[#672828] flex items-center justify-start mt-[24px]">
                  <Check
                    className="mr-[12px]"
                    onClick={() => {
                      setIsRead((pre) => !pre);
                    }}
                    status={isRead}
                  />
                  我已阅读并同意
                  <Button
                    className="text-[#FF7700]"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    《玩法须知和公约》
                  </Button>
                </div>
                <div className="flex justify-center items-center mt-[26px]">
                  <Button
                    className="w-[220px] h-[72px] flex items-center justify-center relative mr-[26px]"
                    onClick={toClose}
                  >
                    <img
                      alt=""
                      src={NoIcon}
                      className="absolute top-[0] left-[-2px] h-[78px]"
                    />
                    <span className="relative z-10 font-semibold text-[#672828] text-[28px]">
                      不同意
                    </span>
                  </Button>
                  <Button
                    className="w-[220px] h-[72px] flex items-center justify-center relative"
                    onClick={enter}
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
                <div className="text-[24px] text-[#672828] mt-[16px] flex items-center justify-center">
                  <Check
                    className="mr-[8px]"
                    onClick={() => {
                      setTipsStatus((pre) => !pre);
                    }}
                    status={tipsStatus}
                  />
                  今日不再弹出
                </div>
              </div>
            </div>
          </div>
        </Mask>
        <RulePop
          visible={open}
          handleClose={(status) => {
            setOpen(false);
            if (status) {
              setIsRead(status);
            }
          }}
        />
      </>
    );
  }
);

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

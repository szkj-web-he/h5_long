/**
 * @file 更多
 * @date 2025-01-10
 * @author hexuejie
 * @lastModify hexuejie 2025-01-10
 */

import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import MoreBgIcon from "@/assets/img/more-bg.png";
import { CSSTransition } from "react-transition-group";
import Icon1 from "@/assets/img/icon1.png";
import Icon2 from "@/assets/img/icon2.png";
import History from "../history";
import { IPopupEvents } from "@/types/types";
import Rule from "../rule";

function Temp() {
  const [open, setOpen] = useState(false);

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const historyEvents = useRef<IPopupEvents | null>(null);

  const ruleEvents = useRef<IPopupEvents | null>(null);

  /**
   * 监听空白处 关闭弹框
   */
  useEffect(() => {
    const fn = (e: Event) => {
      const target = e.target;

      if (target instanceof HTMLElement) {
        const status = target.closest("#more-portal");

        if (status) {
          return;
        }

        if (target.closest("#more")) {
          return;
        }
      }
      setOpen(false);
    };
    if (open) {
      document.body.addEventListener("click", fn);
      return () => {
        document.body.removeEventListener("click", fn);
      };
    }
  }, [open]);

  /**
   * 打开概率规则弹框
   */
  const openProbRuleModal = () => {
    ruleEvents.current?.toOpen();
    setOpen(false);
  };

  /**
   * 打开记录弹框
   */
  const openHistoryModal = () => {
    historyEvents.current?.toOpen();
    setOpen(false);
  };

  return (
    <>
      <Button
        className="w-[64px] h-[64px] bg-center bg-contain bg-transparent bg-no-repeat bg-[url('@/assets/img/more.png')] absolute left-[24px] top-0 z-[15]"
        id="more"
        onClick={() => {
          setOpen((pre) => !pre);
        }}
      />

      <CSSTransition
        nodeRef={nodeRef}
        unmountOnExit
        in={open}
        classNames="fade"
        timeout={100}
      >
        <div
          ref={nodeRef}
          id="more-portal"
          className="w-[240px] h-[252px] absolute z-10 left-[24px] top-[80px]"
        >
          <img
            src={MoreBgIcon}
            alt=""
            loading="lazy"
            className="w-[264px] left-[-12px] top-[-10px] absolute max-w-none"
          />
          <div className="relative w-full h-full p-[16px] z-1 box-border">
            <Button
              className="flex items-center justify-center text-[#803714] text-[24px] w-full h-[100px]"
              onClick={() => {
                openProbRuleModal();
              }}
            >
              <img
                alt=""
                src={Icon2}
                className="h-[36px] mr-[24px]"
                loading="lazy"
              />
              游戏规则
            </Button>
            <div className="w-full h-[1px] bg-[#E6CFA4]" />
            <Button
              className="flex items-center justify-center text-[#803714] text-[24px] w-full h-[100px]"
              onClick={() => {
                openHistoryModal();
              }}
            >
              <img
                alt=""
                src={Icon1}
                className="h-[36px] mr-[24px]"
                loading="lazy"
              />
              历史记录
            </Button>
          </div>
        </div>
      </CSSTransition>

      <History ref={historyEvents} />
      <Rule ref={ruleEvents} />
    </>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

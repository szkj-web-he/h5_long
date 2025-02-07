/**
 * @file 游戏规则
 * @date 2025-01-10
 * @author hexuejie
 * @lastModify hexuejie 2025-01-10
 */

import { getActiveRule, getProbList, IGetProbItem } from "@/api/httpApi/api";
import RuleHistoryPopup from "@/components/RuleHistoryPopup";
import { IPopupEvents } from "@/types/types";
import { forwardRef, useImperativeHandle, useState } from "react";
import Prob from "./components/prob";
import { renderToString } from "react-dom/server";

const Temp = forwardRef<IPopupEvents>((_, events) => {
  const [open, setOpen] = useState(false);

  /**
   * 描述
   */
  const [des, setDes] = useState<string | null>(null);

  /**
   * 获取中奖概率规则数据
   */
  const requestProbList = async () => {
    let data: IGetProbItem[] | null = null;
    try {
      const res = await getProbList();
      if (res?.code === 200) {
        data = res.result ?? null;
      } else {
        data = null;
      }
    } catch (error) {
      console.error("获取中奖概率规则失败", error);
      data = null;
    }
    return data;
  };

  /**
   * 获取规则描述
   */
  const requestRuleDes = async () => {
    let data: string | null = null;
    try {
      const res = await getActiveRule();
      if (res?.code === 200) {
        data = res.result.regulation ?? null;
      } else {
        data = null;
      }
    } catch (error) {
      console.error("获取规则描述失败", error);
      data = null;
    }
    return data;
  };

  const requestData = () => {
    Promise.all([requestProbList(), requestRuleDes()]).then(
      ([probList, ruleTes]) => {
        if (!ruleTes) {
          return;
        }
        const html = renderToString(<Prob list={probList ?? undefined} />);
        const doc = new DOMParser().parseFromString(ruleTes, "text/html");
        const aHerfDom = doc.querySelector('a[href="概率列表"]');
        const createDiv = doc.createElement("div");
        createDiv.innerHTML = html;
        aHerfDom?.parentNode?.replaceChild(createDiv, aHerfDom);
        setDes(doc.body.innerHTML);
      }
    );
  };

  useImperativeHandle(events, () => {
    return {
      toOpen: () => {
        requestData();
        setOpen(true);
      },
    };
  });

  return (
    <RuleHistoryPopup
      show={open}
      title={
        <div
          className={`bg-contain bg-transparent bg-no-repeat bg-[url("@/assets/svg/rule-title.svg")] bg-center w-[196px] h-[62px]`}
        />
      }
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="px-[30px] scrollAuto h-full w-full pb-[20px]">
        <div className="w-full h-[32px]" />
        <div
          dangerouslySetInnerHTML={{
            __html: des ?? "",
          }}
        ></div>
      </div>
    </RuleHistoryPopup>
  );
});

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

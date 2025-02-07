/**
 * @file 消息推送
 * @date 2025-01-15
 * @author hexuejie
 * @lastModify hexuejie 2025-01-15
 */

import { getMarquee, IMarqueeItem } from "@/api/httpApi/api";
import { useCallback, useEffect, useRef, useState } from "react";
import Item from "./components/item";
import { useWebsocket } from "@/hooks/useWebsocket";

function Temp() {
  /**
   * 弹幕列表
   */
  const list = useRef<Array<IMarqueeItem> | null>(null);

  /**
   * 第一行
   */
  const [state, setState] = useState<IMarqueeItem | null>(null);

  /**
   * 追加数据
   */
  const pushData = useCallback((res: IMarqueeItem) => {
    setState((pre) => {
      if (pre) {
        list.current = [...(list.current ?? []), res];
        return pre;
      }
      return res;
    });
  }, []);

  /**
   * 建立socket
   */
  const createdFn = useWebsocket(pushData);

  /**
   * 请求获取跑马灯列表
   */
  useEffect(() => {
    const requestData = async () => {
      const res = await getMarquee();

      if (res.code === 200) {
        const arr = res.result ? [...res.result] : undefined;

        const data = arr?.shift();
        if (data) {
          setState(data);
        }
        list.current = [...(list.current ?? []), ...(arr ?? [])];
      }
    };

    setTimeout(() => {
      requestData();
      createdFn();
    }, 2000);
  }, [createdFn]);

  /**
   * 当动画结束后
   */
  const handleAnimateEnd = useCallback(() => {
    const data = list.current?.shift();
    if (!data) {
      setState(null);
      return;
    }

    setState(data);
  }, []);

  return (
    <div className="absolute top-[240px] left-0 z-[3] w-full">
      <Item item={state ?? undefined} handleAnimateEnd={handleAnimateEnd} />
    </div>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

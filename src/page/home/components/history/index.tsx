/**
 * @file 我的记录
 * @date 2025-01-10
 * @author hexuejie
 * @lastModify hexuejie 2025-01-10
 */

import { getWinningList, IWinningHistoryItem } from "@/api/httpApi/api";
import RuleHistoryPopup from "@/components/RuleHistoryPopup";
import { IPopupEvents } from "@/types/types";
import { DotLoading } from "antd-mobile";
import NullIcon from "@/assets/img/bird.png";
import Item from "./components/item";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

const Temp = forwardRef<IPopupEvents>((_, events) => {
  const [open, setOpen] = useState(false);

  /**
   * 我的中奖记录
   */
  const [historyList, setHistoryList] =
    useState<Array<IWinningHistoryItem> | null>(null);

  /**
   * 请求状态
   */
  const [loading, setLoading] = useState(false);

  /**
   * 加载下一页的LoadingDom
   */
  const loadingDom = useRef<HTMLDivElement | null>(null);

  /**
   * 分页数据
   */
  const pageData = useRef<{
    pageNum: number;
    totalPages: number;
  }>({
    pageNum: 1,
    totalPages: 0,
  });

  /**
   * 获取首页 中奖历史记录列表
   */
  const requestHistoryList = async () => {
    const pageNum = pageData.current.pageNum;
    try {
      setLoading(true);
      const res = await getWinningList(pageNum - 1);
      if (res?.code === 200) {
        setHistoryList(res.result.dragonLotteryVos ?? null);

        pageData.current.totalPages = res.result.totalPages ?? 0;
        return;
      }
      setHistoryList(null);
    } catch (error) {
      console.error("获取中奖历史记录列表失败", error);
      setHistoryList(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 加载更多
   */
  useEffect(() => {
    /**
     * 获取下一页的 中奖历史记录列表
     */
    const requestNextList = async () => {
      if (loading) {
        return;
      }
      const pageNum = pageData.current.pageNum;

      try {
        setLoading(true);
        const res = await getWinningList(pageNum - 1);
        if (res?.code === 200) {
          if (pageNum === 1) {
            setHistoryList(res.result.dragonLotteryVos ?? null);
          } else {
            setHistoryList((pre) => {
              return [...(pre ?? []), ...(res.result.dragonLotteryVos ?? [])];
            });
          }

          pageData.current.totalPages = res.result.totalPages ?? 0;
          return;
        }
        setHistoryList(null);
      } catch (error) {
        console.error("获取中奖历史记录列表失败", error);
        setHistoryList(null);
      } finally {
        setLoading(false);
      }
    };
    const node = loadingDom.current;

    const ob = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio > 0) {
          ++pageData.current.pageNum;
          requestNextList();
        }
      },
      {
        threshold: 0.1,
        root: null,
        rootMargin: "0px",
      }
    );

    if (
      pageData.current.pageNum < pageData.current.totalPages &&
      node &&
      !loading
    ) {
      ob.observe(node);
      return () => {
        ob.unobserve(node);
        ob.disconnect();
      };
    }
  }, [loading]);

  useImperativeHandle(events, () => {
    return {
      toOpen: () => {
        setOpen(true);
        pageData.current = {
          pageNum: 1,
          totalPages: 0,
        };
        requestHistoryList();
      },
    };
  });

  function customDate(formatStr: string, timeStamp: number): string {
    const date = new Date(timeStamp);
    const t: {
      [key: string]: number;
    } = {
      "M+": date.getMonth() + 1, // month
      "d+": date.getDate(), // day
      "H+": date.getHours(), // hour of 24
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
    };
    let reg = /y+/i;
    // year
    if (reg.test(formatStr)) {
      formatStr = formatStr.replace(reg, (res) => {
        const y = date.getFullYear().toString();
        return y.substring(4 - res.length);
      });
    }

    // other (month || day)
    for (const a in t) {
      if (new RegExp(`(${a})`).test(formatStr)) {
        reg = new RegExp(`(${a})`);
        const val = Number(t[a]);
        formatStr = formatStr.replace(reg, () => {
          return `${val}`.padStart(2, "0");
        });
      }
    }
    return formatStr;
  }

  return (
    <RuleHistoryPopup
      show={open}
      title={
        <div
          className={`bg-contain bg-transparent bg-no-repeat bg-[url("@/assets/svg/history-title.svg")] bg-center w-[196px] h-[62px]`}
        />
      }
      onClose={() => {
        setOpen(false);
      }}
    >
      <div
        className={clsx(
          "w-full h-full flex items-center justify-center",
          !loading &&
            pageData.current.pageNum &&
            (!historyList?.length || !pageData.current.totalPages)
            ? ""
            : "hidden"
        )}
      >
        <img src={NullIcon} alt="" className="w-[197.2px]" />
      </div>
      <div className="px-[30px] scrollAuto h-full w-full" key={Number(open)}>
        <div className="w-full h-[40px]" />
        {historyList?.map((item) => {
          return (
            <div
              key={item.time}
              className="pt-[22px] pb-[28px] bg-[rgba(189,90,16,0.1)] mb-[24px]"
            >
              <div className="flex justify-between items-center mb-[24px] px-[20px]">
                <span className="text-[#803714] font-['DINPro'] font-medium text-[24px] leading-[28px]">
                  {customDate("yyyy-MM.dd HH:mm:ss", item.time ?? 0)}
                </span>
                <span className="text-[#803714] text-[24px] leading-[28px]">
                  开启获得
                </span>
              </div>

              <div className="flex justify-start items-start flex-wrap pl-[20px] pr-[6px]">
                {item.giftVos?.map((gift, index) => {
                  return <Item key={index} item={gift} />;
                })}
              </div>
            </div>
          );
        })}

        {pageData.current.pageNum < pageData.current.totalPages ? (
          <div
            className="text-[#999] flex items-center justify-center text-[28px] min-h-[53px]"
            ref={loadingDom}
          >
            <DotLoading color="currentColor" />
            加载中...
          </div>
        ) : undefined}
      </div>
    </RuleHistoryPopup>
  );
});

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

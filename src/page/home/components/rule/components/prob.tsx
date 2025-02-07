/**
 * @file
 * @date 2025-01-17
 * @author hexuejie
 * @lastModify hexuejie 2025-01-17
 */

import { IGetProbItem } from "@/api/httpApi/api";

interface ITempProps {
  list?: Array<IGetProbItem>;
}

function Temp({ list }: ITempProps) {
  return (
    <>
      <div className="flex items-center justify-start flex-nowrap mt-[10px]">
        <div className="w-[35%] h-[52px] text-white text-[26px] bg-[#EFB26D] flex-none overflow-hidden inline-flex items-center justify-center border-r-[1px] border-r-[rgba(#EFB26D,0.5)]">
          礼物
        </div>
        <div className="w-[35%] h-[52px] text-white text-[26px] bg-[#EFB26D] flex-none overflow-hidden inline-flex items-center justify-center border-r-[1px] border-r-[rgba(#EFB26D,0.5)]">
          价值
        </div>
        <div className="w-[30%] h-[52px] text-white text-[26px] bg-[#EFB26D] flex-none overflow-hidden inline-flex items-center justify-center">
          概率（％）
        </div>
      </div>
      {list?.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-stretch justify-start flex-nowrap min-h-[52px] border-b-[#EFB26D] border-b-[1px]"
          >
            <div className="w-[35%] flex-none overflow-hidden inline-flex items-center justify-center border-r-[1px] border-l-[1px] border-[#EFB26D]">
              <div className=" text-[#803714] text-[26px] leading-[30px] break-words break-all">
                {item.name}
              </div>
            </div>
            <div className="w-[35%] flex-none overflow-hidden inline-flex items-center justify-center border-r-[1px] border-[#EFB26D] font-['DINPro'] font-medium">
              <div className=" text-[#803714] text-[26px] leading-[30px] break-words break-all">
                {item.giftPrice}
              </div>
            </div>
            <div className="w-[30%] flex-none overflow-hidden inline-flex items-center justify-center border-r-[1px] border-[#EFB26D] font-['DINPro'] font-medium">
              <div className=" text-[#803714] text-[26px] leading-[30px] break-words break-all">
                {item.prob}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

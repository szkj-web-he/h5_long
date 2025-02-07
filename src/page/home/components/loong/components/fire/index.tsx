/**
 * @file 火
 * @date 2025-01-13
 * @author hexuejie
 * @lastModify hexuejie 2025-01-13
 */

import { useSvgaPlayer } from "@/hooks/useSvgaPlayer";
import fire from "@/assets/svga/fire.svga?url";
import { memo } from "react";

function Temp() {
  const ref = useSvgaPlayer({}, fire);

  return (
    <div
      ref={ref}
      className="w-full absolute top-[604px] left-0 z-[3] h-[320px] fire-svga"
    ></div>
  );
}

export default memo(Temp);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

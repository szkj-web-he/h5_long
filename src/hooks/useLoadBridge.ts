/**
 * @file 加载js桥
 * @date 2025-01-08
 * @author hexuejie
 * @lastModify hexuejie 2025-01-08
 */

import { useEffect, useState } from "react";

export const useLoadBridge = () => {
  /**
   * 加载状态
   */
  const [pendingStatus, setPendingStatus] = useState<
    "success" | "error" | "loading"
  >("loading");

  /**
   * Js桥加载状态
   */
  useEffect(() => {
    const loadJs = () => {
      const scriptDom = document.createElement("script");
      scriptDom.src =
        "https://zykj-app.oss-cn-beijing.aliyuncs.com/zykj/h5/public/js/WebViewJavascriptBridge.js";
      scriptDom.id = "bridgejs";
      document.body.append(scriptDom);

      scriptDom.onload = () => {
        setPendingStatus("success");
      };

      scriptDom.onerror = () => {
        setPendingStatus("error");
      };
    };

    if (!document.getElementById("bridgejs")) {
      loadJs();
    }
  }, []);

  return pendingStatus;
};

/**
 * @file 预加载资源
 * @date 2025-01-19
 * @author hexuejie
 * @lastModify hexuejie 2025-01-19
 */
import GetBgIcon from "@/assets/img/get-bg.png";
import { startTransition, useEffect } from "react";

export const usePreLoadAssets = () => {
  useEffect(() => {
    const createLink = (url: string) => {
      const el = document.createElement("link");
      el.setAttribute("as", "image");
      el.setAttribute("href", url);
      document.head.appendChild(el);
    };
    startTransition(() => {
      createLink(GetBgIcon);
    });
  }, []);
};

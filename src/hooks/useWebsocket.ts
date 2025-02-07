/**
 * @file websocket
 * @date 2025-01-15
 * @author hexuejie
 * @lastModify hexuejie 2025-01-15
 */

import { IMarqueeItem } from "@/api/httpApi/api";
import { useCallback, useEffect, useRef } from "react";

/**
 * 手动关闭socket的code
 */
const CloseCode = 4999;

export const useWebsocket = (callback: (res: IMarqueeItem) => void) => {
  /**
   * 重连次数
   */
  const reconnectCount = useRef(0);

  /**
   * socket
   */
  const socketRef = useRef<WebSocket | null>(null);

  /**
   * 重连延时器
   */
  const connectionTimer = useRef<number | null>(null);

  /**
   * 创建socket链接
   */
  const createConnection = useCallback(() => {
    /**
     *
     * @returns 重连
     */
    const reconnectSocket = () => {
      if (socketRef.current) {
        return;
      }

      ++reconnectCount.current;
      if (reconnectCount.current > 3) {
        return;
      }
      createConnection();
    };

    const socket = new WebSocket(`${import.meta.env.VITE_GAME_WS}`);
    console.log(`${import.meta.env.VITE_GAME_WS}`, "socket连接");

    /**
     * socket连接超时
     */
    if (connectionTimer.current) {
      window.clearTimeout(connectionTimer.current);
    }
    connectionTimer.current = window.setTimeout(() => {
      reconnectSocket();
    }, 10000);

    socket.onopen = () => {
      socketRef.current?.close(CloseCode);
      reconnectCount.current = 0;
      socketRef.current = socket;
      if (connectionTimer.current) {
        window.clearTimeout(connectionTimer.current);
      }
    };

    // 监听消息
    socket.onmessage = (message) => {
      const res = JSON.parse(message.data) as {
        code: number;
        data: IMarqueeItem;
        dataType: number;
      };
      if (res.code === 200 && res.dataType === 1110201) {
        callback?.(res.data);
      }
    };

    // 监听错误
    socket.onerror = (event) => {
      console.error("socket报错", event);
    };

    // 监听关闭
    socket.onclose = (err) => {
      socketRef.current = null;
      if (err.code === CloseCode || !navigator.onLine) {
        console.log("socket断开了", err);
        return;
      }
      if (connectionTimer.current) {
        window.clearTimeout(connectionTimer.current);
      }
      reconnectSocket();
    };
  }, [callback]);

  /**
   * 监听网络状态
   */
  useEffect(() => {
    const handleOnline = () => {
      if (socketRef.current) {
        return;
      }
      createConnection();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [createConnection]);

  useEffect(() => {
    return () => {
      socketRef.current = null;
    };
  }, []);

  return createConnection;
};

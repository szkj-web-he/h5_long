import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  BalanceContext,
  DeviceInfoContext,
  IAppInfo,
  IUserInfo,
  RoomDataProps,
  UpdateBalanceContext,
} from "./context/context";
import nativeApi from "@/api/nativeApi";
import { useLoadBridge } from "@/hooks/useLoadBridge";
import StorageKeys from "@/api/httpApi/StorageKeys";
import Entry from "./components/entry";
import Login from "../LoginPage";
import "./style.scss";
import { getUserInfo, IPlayerInfo } from "@/api/httpApi/user";
import { registerHandler } from "@/functions/jsBrige";
import { usePreLoadAssets } from "@/hooks/usePreLoadAssets";

function Temp() {
  usePreLoadAssets();
  /**
   * 设备信息
   */
  const [deviceState, setDeviceState] = useState<IAppInfo | null>(null);
  /**
   * 用户信息
   */
  const [userState, setUserState] = useState<IUserInfo | null>(null);

  /**
   * 加载js桥
   */
  const status = useLoadBridge();

  /**
   * 钱包余额
   */
  const [balance, setBalance] = useState(0);

  /**
   * 房间信息
   */
  const [roomData, setRoomData] = useState<RoomDataProps | null>(null);

  /**
   * 当前弹框的类型
   */
  const [tipsType, setTipsType] = useState<NonNullable<
    IPlayerInfo["pop"]
  > | null>(null);

  /**
   * 设置设备信息
   */
  const changeDeviceData = useCallback((res: IAppInfo | null) => {
    setDeviceState(res);
    if (res) {
      window.localStorage.setItem(StorageKeys.appInfo, JSON.stringify(res));
    } else {
      window.localStorage.removeItem(StorageKeys.appInfo);
    }
  }, []);
  /**
   * 设置用户信息
   */
  const changeUserData = useCallback((res: IUserInfo | null) => {
    setUserState(res);
    if (res?.appToken) {
      window.localStorage.setItem(StorageKeys.loginInfo, JSON.stringify(res));
    } else {
      if (import.meta.env.DEV) {
        return;
      }
      window.localStorage.removeItem(StorageKeys.loginInfo);
    }
  }, []);

  useLayoutEffect(() => {
    /**
     * 加载设备信息
     */
    const loadAppInfo = () => {
      nativeApi.app
        .getAppInfo()
        .then(({ data }) => {
          if (data) {
            changeDeviceData(data);
          } else {
            changeDeviceData(null);
            console.error("加载设备信息失败 error =", data);
          }
        })
        .catch((error) => {
          console.error("加载设备信息失败 error =", error);
          changeDeviceData(null);
        });
    };

    /**
     * 加载房间id
     */
    const loadRoomId = () => {
      nativeApi.app
        .getRoomId()
        .then(({ data }) => {
          if (data?.anchorId && data.roomId) {
            setRoomData({
              roomId: Number(data.roomId),
              anchorId: Number(data.anchorId),
            });
          } else {
            setRoomData(null);
            console.error("加载房间信息失败 error =", data);
          }
        })
        .catch((error) => {
          console.error("加载房间信息失败 error =", error);
          setRoomData(null);
        });
    };

    /**
     * 加载用户信息
     */
    const loadUserInfo = () => {
      nativeApi.user
        .getUserInfo()
        .then(({ data }) => {
          if (data?.userId) {
            changeUserData(data);
          } else {
            changeUserData(null);
            console.error("加载用户信息失败 error =", data);
          }
        })
        .catch((error) => {
          console.error("加载用户信息失败 error =", error);
          changeUserData(null);
        });
    };
    if (status === "success") {
      loadAppInfo();
      loadRoomId();
      loadUserInfo();
    }
  }, [changeDeviceData, changeUserData, status]);

  /**
   * 获取钱包和弹框信息
   */
  const getBalance = useCallback(async () => {
    try {
      const res = await getUserInfo();

      if (res.code === 200) {
        setTipsType(res.result.pop ?? null);
        setBalance(res.result.currency ?? 0);
        return;
      }
      console.error("获取钱包余额失败", res);
    } catch (error) {
      console.error("获取钱包余额失败", error);
    }
  }, []);

  /**
   * 获取钱包和弹框信息
   */
  useLayoutEffect(() => {
    if (userState?.appToken) {
      getBalance();
    }
  }, [getBalance, userState]);

  useEffect(() => {
    /** 刷新金额 */
    registerHandler("refreshAmount", () => {
      getBalance();
    });

    /**
     * 当视口可见变化发生变化的时候
     */
    const handleVisibilitychange = () => {
      if (document.visibilityState === "visible") {
        getBalance();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilitychange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilitychange);
    };
  }, [getBalance]);

  /**
   * 更改钱包余额
   */
  const changeVal = useCallback((res: number) => {
    setBalance(res);
  }, []);

  return (
    <BalanceContext.Provider value={balance}>
      <UpdateBalanceContext.Provider value={changeVal}>
        <DeviceInfoContext.Provider value={deviceState}>
          {import.meta.env.DEV ? (
            <Login
              userInfo={userState ?? undefined}
              changeUserInfo={changeUserData}
            >
              <Entry
                tipsType={tipsType ?? undefined}
                roomData={roomData ?? undefined}
              />
            </Login>
          ) : (
            <Entry
              tipsType={tipsType ?? undefined}
              roomData={roomData ?? undefined}
            />
          )}
        </DeviceInfoContext.Provider>
      </UpdateBalanceContext.Provider>
    </BalanceContext.Provider>
  );
}

export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

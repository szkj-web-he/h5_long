import axios, { AxiosInstance } from "axios";
import { Toast } from "antd-mobile";
import type { IAPPInfo } from "@/api/nativeApi";
import app from "@/api/nativeApi/app";
import StorageKeys from "./StorageKeys";
import apiBaseURL from "./common";

export interface IHttpResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface IHttpPageResponse<T> {
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
  list: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorMessage: any = {
  302: "302:接口重定向了！",
  400: "400:参数不正确！",
  401: "401:您未登录，或者登录已经超时，请先登录！",
  403: "403:您没有权限操作！",
  404: "链接已失效",
  408: "408:请求超时！",
  409: "409:系统已存在相同数据！",
  500: "500:服务器内部错误！",
  501: "501:服务未实现！",
  502: "502:网关错误！",
  503: "503:服务不可用！",
  504: "504:服务暂时无法访问，请稍后再试！",
  505: "505:HTTP 版本不受支持！",
};

let timer: null | number = null;

const createService = (url: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL: url, // 基础请求地址
    timeout: 10000, // 请求超时设置
    withCredentials: false, // 跨域请求是否需要携带 cookie
  });

  // 添加请求拦截器
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let appInfo: IAPPInfo = {} as any;
  instance.interceptors.request.use(
    (config) => {
      if (!config.url?.endsWith("/user/login")) {
        config.headers.Authorization =
          JSON.parse(localStorage.getItem(StorageKeys.loginInfo) || "{}")
            .appToken ?? ""; // 请求头携带 token
      }

      if (!appInfo.deviceId) {
        const appInfoStr =
          localStorage.getItem(StorageKeys.appInfo) ||
          JSON.stringify({
            appVersion: "0.0.0",
            deviceId: "test_123456",
            deviceName: "test_iPhone",
            deviceType: 1,
            systemVersion: "605.1.15",
            statusBarHeight: 34,
            navigationBarHeight: 44,
            safeAreaInsetBottom: 44,
          });
        appInfo = JSON.parse(appInfoStr);
      }

      config.headers.appVersion = appInfo.appVersion;
      config.headers.deviceId = appInfo.deviceId || "";
      config.headers.deviceName = appInfo.deviceName || "";
      config.headers.deviceType = appInfo.deviceType;
      config.headers.systemVersion = appInfo.systemVersion;
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    (res) => {
      if (!res.config.headers?.ignoreErr && res.data.code !== 200) {
        if (res.data.code !== -213) {
          Toast.show({
            content: res.data.message || `${res.data.code}`,
          });
        }
        if (res.data.code === 401) {
          localStorage.removeItem(StorageKeys.loginInfo);
        }

        return Promise.reject(res);
      }

      return res?.data;
    },
    (error) => {
      console.error(`[axios] response error = ${error?.message}`);

      if (axios.isCancel(error)) {
        return error;
      }

      if (!error?.config?.headers?.ignoreErr) {
        const status = error?.response?.status || "";
        Toast.show({
          icon: "fail",
          content: `${
            errorMessage[status] ||
            error?.message ||
            status ||
            "网络请求未知错误"
          }`,
          afterClose: () => {
            if (error.config.headers.backApp && status === 404) {
              if (timer) {
                window.clearTimeout(timer);
              }
              timer = window.setTimeout(() => {
                /**
                 * 是否需要返回app首页
                 */
                app.gobBack();
              }, 2100);
            }
          },
        });
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const gatewayService: AxiosInstance = createService(
  apiBaseURL.gatewayBaseURL
);
export const orderService: AxiosInstance = createService(apiBaseURL.orderURL);

export const commonService: AxiosInstance = createService(apiBaseURL.commonURL);

export default gatewayService;

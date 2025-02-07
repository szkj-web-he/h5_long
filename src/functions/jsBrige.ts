interface IBridgeOpts {
  timeout?: number;
}

export interface IBridgeResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const getBridge = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as unknown as Record<string, any>).WebViewJavascriptBridge;
};

// 发送数据给手机端
export const send = <T>(name: string, data: T) => {
  const bridge = getBridge();
  if (!bridge) {
    throw new Error(`WebViewJavascriptBridge uninit`);
  }

  bridge.callHandler(name, data);
};

const _invoke = <P, R>(name: string, data: P): Promise<R> => {
  const bridge = getBridge();
  return new Promise((resolve, reject) => {
    try {
      if (!bridge) {
        throw new Error(`WebViewJavascriptBridge uninit`);
      }

      bridge.callHandler(name, data, (res: R) => {
        console.log(
          `[jsBrige][invoke] Response name=${name},res=${JSON.stringify(res)}}`
        );
        let result = res;
        if (res && typeof res === "string") {
          result = JSON.parse(res);
        }
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// 调用手机端的方法
export const invoke = <P, R>(
  name: string,
  data: P,
  opts: IBridgeOpts = { timeout: 10000 }
): Promise<IBridgeResponse<R>> => {
  // : Promise<IBridgeResponse<T>>
  const task = _invoke<P, IBridgeResponse<R>>(name, data);

  if (opts.timeout) {
    let timeHandle: ReturnType<typeof setTimeout> | undefined = undefined;
    const timeoutTask = new Promise((_, reject) => {
      timeHandle = setTimeout(() => {
        reject(`${name} timed out`);
      }, opts.timeout);
    });
    return new Promise<IBridgeResponse<R>>((resolve, reject) => {
      Promise.race([task, timeoutTask])
        .then((res) => resolve(res as IBridgeResponse<R>))
        .catch((err) => reject(err))
        .finally(() => {
          if (timeHandle) {
            clearTimeout(timeHandle);
          }
        });
    });
  }

  return task;
};

// 注册方法给手机段调用

export const registerHandler = (
  name: string,
  handler: (res: unknown) => void
) => {
  const bridge = getBridge();
  if (!bridge || !bridge.registerHandler) {
    console.log(`[WebViewJavascriptBridge]registerHandler bridge undefined`);
    return;
  }

  bridge.registerHandler(name, (data: unknown) => {
    console.log(
      `[jsBrige][registerHandler] name=${name},data=${JSON.stringify(data)}}`
    );
    handler(data);
  });
};

export default {
  send,
  invoke,
  registerHandler,
};

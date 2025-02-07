/**
 * @file 播放svga
 * @date 2024-12-18
 * @author hexuejie
 * @lastModify hexuejie 2024-12-18
 */
import { useEffect, useRef } from "react";
import { Parser, Player } from "svgaplayerweb";

/**
 * 通过URL判断是否是SVGA
 */
export const isSvga = (svgaUrl?: string) => {
  if (svgaUrl?.startsWith("blob:http")) {
    return true;
  }

  if (!svgaUrl) {
    return false;
  }
  let str = "";
  const length = svgaUrl.length - 1;
  let index = 0;
  for (let i = length; i > 0; i -= 1) {
    str = svgaUrl[i] + str;
    ++index;
    if (index > 4) {
      i = -1;
    }
  }
  str = str.toLocaleLowerCase();

  return ["_svga", ".svga"].includes(str);
};

interface ISvgaPlayerOptions {
  /**
   * 播放完成后 停留在最后一帧 还是第一帧
   *
   * Forward  => 最后一帧 (默认值)
   * Backward => 第一帧
   */
  fillMode?: Player["fillMode"];
  /**
   * 重复次数
   * 0 => 一直重复(默认值)
   */
  loops?: number;
  /**
   * 播放完成后是否清空
   * **默认值 true
   */
  clearsAfterStop?: boolean;

  /**
   * 是否自动播放
   * **默认值 true
   */
  autoPlay?: boolean;
}

/**
 *
 * @param {ISvgaPlayerOptions} options Player的参数
 * @param svgaUrl svga的链接
 * @param onSuccess 加载成功后的回调
 * @param onError 加载失败后的回调
 * @param onFinished 当播放停止后的回调
 * @param onProgress 监听播放进度
 */
export const useSvgaPlayer = (
  options: ISvgaPlayerOptions,
  svgaUrl?: string,
  onSuccess?: (player?: Player) => void,
  onError?: () => void,
  onFinished?: () => void,
  onProgress?: (percentage: number) => void
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /**
     * 创建player
     */
    let player: Player | null = null;
    let parser: Parser | null = null;
    const createPlayer = () => {
      const node = ref.current;

      if (!node || !isSvga(svgaUrl)) {
        return;
      }

      player = new Player(node);
      parser = new Parser();

      parser.load(
        svgaUrl!,
        (videoItem) => {
          if (!player) {
            onError?.();
            return;
          }
          player.loops = options.loops ?? 0;
          player.clearsAfterStop = options.clearsAfterStop ?? true;
          player.fillMode = options.fillMode ?? "Forward";

          player.setVideoItem(videoItem);
          if (options.autoPlay || typeof options.autoPlay === "undefined") {
            player.startAnimation();
          }
          onSuccess?.(player);
          if (onFinished) {
            player.onFinished(() => {
              onFinished?.();
            });
          }

          if (onProgress) {
            player.onPercentage((percentage) => {
              onProgress?.(percentage);
            });
          }
        },
        (err) => {
          onError?.();
          console.error("svga资源加载失败", err, "url:", svgaUrl);
        }
      );
    };

    createPlayer();
    return () => {
      player?.stopAnimation(true);
      player?.clear();
      player?.clearDynamicObjects();
      if (player && "_videoItem" in player) {
        player._videoItem = null;
      }
      player = null;
    };
  }, [onError, onFinished, onSuccess, svgaUrl, options, onProgress]);

  return ref;
};

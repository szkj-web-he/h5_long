import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { URL, fileURLToPath } from "node:url";
import postcsspxtoviewport from "postcss-px-to-viewport-8-plugin";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
    postcss: {
      plugins: [
        tailwind(),
        autoprefixer(
          ["ios >= 7.1", "android >= 4.1", "> 1%", "Chrome > 31", "ff > 31"],
          {
            grid: true,
          }
        ),
        postcsspxtoviewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 2, // 转换后的精度，即小数点位数
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/i], // 设置忽略文件，用正则做目录名匹配
          landscape: false, // 是否处理横屏情况
        }),
      ],
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/app": {
        target: "http://101.201.47.8:5300",
        changeOrigin: true,
        rewrite: (path: string) => {
          const str = path.replace(/^\/app/, "");
          return str;
        },
      },
    },
  },
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 10 * 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          a: ["svgaplayerweb"],
          r: ["react", "react-dom"],
        },
      },
    },
  },
});

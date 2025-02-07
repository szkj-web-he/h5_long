import "normalize.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./transition.scss";
import App from "./page/home";
import pwaWorker from "@/assets/js/service-worker?url";

createRoot(document.getElementById("root")!).render(<App />);
if (import.meta.env.MODE === "development") {
  const scriptDom = document.createElement("script");
  scriptDom.src =
    "https://zykj-app.oss-cn-beijing.aliyuncs.com/zykj/h5/public/js/eruda.js";
  document.head.appendChild(scriptDom);
  scriptDom.onload = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as unknown as Record<string, any>).eruda.init();
  };
}

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(pwaWorker);
      if (registration.installing) {
        alert("安装");
      } else if (registration.waiting) {
        alert("已安装");
      } else if (registration.active) {
        alert("当前活跃");
      }
    } catch (error) {
      alert("报错");
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();

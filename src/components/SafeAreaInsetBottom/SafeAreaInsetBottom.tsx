import { useDeviceInfo } from "@/page/home/context/context";

export default function SafeAreaInsetBottom() {
  const deviceInfo = useDeviceInfo();

  const safeAreaInsetBottom = deviceInfo?.safeAreaInsetBottom ?? 0;

  return (
    <div
      style={{
        paddingBottom: `${safeAreaInsetBottom}px`,
      }}
      className="w-full transition-all ease-linear flex-none"
    />
  );
}

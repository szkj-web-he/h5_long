import { useEffect, useState } from "react";
import { Input, Modal } from "antd-mobile";
import StorageKeys from "@/api/httpApi/StorageKeys";
import { IUserInfo } from "../home/context/context";
import { login } from "@/api/httpApi/user";

interface ILoginPageProps {
  children: React.ReactNode;
  /**
   * 用户信息
   */
  userInfo?: IUserInfo;
  /**
   * 改变用户信息
   */
  changeUserInfo: (res: IUserInfo) => void;
}

export default function LoginPage({
  children,
  userInfo,
  changeUserInfo,
}: ILoginPageProps) {
  const [visible, setVisible] = useState(false);
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");

  const userLogin = async () => {
    try {
      const { code, result } = await login({
        phoneNumber: account.trim(),
        code: pwd.trim() || "123456",
      });

      if (code === 200) {
        changeUserInfo(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (() => {
      if (userInfo?.appToken) {
        setVisible(false);
        return;
      }

      const userStr = localStorage.getItem(StorageKeys.loginInfo);
      if (!userStr) {
        setVisible(true);
        return;
      }
      const usrInfo = JSON.parse(userStr);
      if (usrInfo.appToken) {
        setVisible(false);
        changeUserInfo(usrInfo as IUserInfo);
      } else {
        setVisible(true);

        return;
      }
    })();
  }, [changeUserInfo, userInfo]);

  return (
    <>
      <Modal
        visible={visible}
        title="登录弹窗"
        style={{
          zIndex: 100000,
        }}
        content={
          <>
            <Input
              placeholder="请输入账号"
              value={account}
              onChange={(val) => {
                setAccount(val);
              }}
            />
            <Input
              placeholder="请输入验证码"
              value={pwd}
              style={{ marginTop: "20px" }}
              onChange={(val) => {
                setPwd(val);
              }}
            />
          </>
        }
        closeOnAction
        onClose={() => {
          setVisible(false);
          userLogin();
        }}
        actions={[
          {
            key: "confirm",
            text: "登录",
          },
        ]}
      />
      {children}
    </>
  );
}

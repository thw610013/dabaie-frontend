"use client"
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "./layouts/BaiscLayout";
import React, { useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { AxiosResponse } from "axios";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import AccessLayout from "@/access/accessLayout";
import Access_Enum from "@/access/accessEnum";
const InitLayout: React.FC<Readonly<{
  children: React.ReactNode;
}>> = ({ children }) => {

  const dispatch = useDispatch<AppDispatch>();

  //全局初始化函数，有全局单词调用的代码都可以写在这里
  const doInitloginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      dispatch(setLoginUser(res.data as API.LoginUserVO));
    } else {
      // 模拟登录，测试用
      // const testUser = {
      //   userName: "管理员",
      //   id: 1,
      //   userAvatar: "/asstes/psyduck.png",
      //   userRole: Access_Enum.ADMIN,
      // }
      // dispatch(setLoginUser(testUser));
    }

  }, [])

  useEffect((): void => {
    doInitloginUser();
  })

  return children;

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const doInit = (): void => {
    console.log("doInit")
  }

  //只执行一次
  useEffect(() => {
    doInit();
  }, [])

  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout><AccessLayout>{children}</AccessLayout></BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}

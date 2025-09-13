"use client";

import GlobalFttoer from "@/app/components/GlobalFooter";
import { GithubFilled, SearchOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import './index.css'
import { menus } from "../../../../confg/menu";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import Image from "next/image";
import { Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import getAccessibelMenus from "@/access/menuAccess";
import { useRouter } from "next/navigation";
import { userLogoutUsingPost } from "@/api/userController";
import { DEFAULT_USER } from "@/constants/user";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import SearchInput from "./components/SearchInput/Index";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname: string = usePathname();
  const router = useRouter();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("退出登录！");
      // 保存用户登录态
      dispatch(setLoginUser(DEFAULT_USER));
      //push 是新加入了一个页面 ， replace 是 在原来页面
      router.push("/user/login");
    } catch (e: any) {
      message.error('登录失败，' + e.message);
    }
  }

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      {/* 状态栏 */}
      <ProLayout title="大白鹅知识库" layout="top"
        logo={<Image src="/assets/dabaie.png" width={32} height={32} alt="大白鹅知识库" />}
        siderWidth={256}
        location={{ pathname }}
        menu={{ type: "group" }}
        avatarProps={{
          src: loginUser.userAvatar,
          size: "small",
          title: loginUser.userName || "大白鹅",
          render: (props, dom) => {
            return loginUser.id ? (
              <Dropdown menu={{
                items: [{ key: "userCenter", label: "个人中心", icon: <UserOutlined /> }, { key: "logout", label: "退出登录", icon: <LogoutOutlined /> }],

                onClick: async (event: { key: React.Key }) => {
                  if (event.key === "logout") { userLogout(); } else if (event.key === "userCenter") { router.push("/user/center") }
                }
              }} >
                {dom}
              </Dropdown>
            ) : (<div onClick={() => { router.push("/user/login"); }} style={{ cursor: "pointer" }}> {dom}</div>);
          }
        }}
        actionsRender={(props) => {
          if (props.isMobile) {
            return [];
          }
          return [
            <SearchInput key="search" />,
            <a href="https://github.com/" target="_blank" key={"GithubFilled"}>
              <GithubFilled key="GithubFilled" />,
            </a>,
          ];
        }}
        // 渲染底部栏
        footerRender={() => {
          return <GlobalFttoer />
        }}
        menuDataRender={() => {
          return getAccessibelMenus(loginUser, menus);
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}

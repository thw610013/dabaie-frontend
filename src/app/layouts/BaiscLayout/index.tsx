"use client";

import GlobalFttoer from "@/app/components/GlobalFooter";
import { GithubFilled, SearchOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import './index.css'
import { menus } from "../../../../confg/menu";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname: string = usePathname();

  listQuestionBankVoByPageUsingPost({}).then(res => {
    console.log(res)
  })

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="大白鹅博客"
        layout="top"
        // logo={
        //   <Image
        //     src="/src/assets/dabaie_logo.png"
        //     width={32}
        //     height={32}
        //     alt="大白鹅博客"
        //   />
        // }
        siderWidth={256}
        location={{
          pathname,
        }}
        menu={{
          type: "group",
        }}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          title: "admin",
        }}
        actionsRender={(props) => {
          if (props.isMobile) {
            return [];
          }
          return [
            <a href="www.github.com" target="_blank" key={"GithubFilled"}>
              <GithubFilled key="GithubFilled" />,
            </a>,
          ];
        }}
        // 渲染底部栏
        footerRender={() => {
          return <GlobalFttoer />
        }}
        menuDataRender={() => {
          return menus;
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

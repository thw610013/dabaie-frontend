import { MenuDataItem } from "@ant-design/pro-components";
import { CrownOutlined } from "@ant-design/icons";

export const menus: MenuDataItem[] = [
    { path: "/", name: "首页" },
    { path: "/banks", name: "题库" },

    {
        path: "/welcome",
        name: "欢迎",
    },
    {
        path: "/admin",
        name: "管理",
        icon: <CrownOutlined />,
        children: [
            {
                path: "/admin/user",
                name: "用户管理",
            },
        ],
    },
] as MenuDataItem[];


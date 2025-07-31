import { MenuDataItem } from "@ant-design/pro-components";
import { CrownOutlined } from "@ant-design/icons";
import Access_Enum from "@/access/accessEnum";

export const menus: MenuDataItem[] = [
    { path: "/", name: "首页" },
    {
        path: "/questions",
        name: "题目大全",
    },
    {
        path: "/banks",
        name: "题库大全",
    },
    {
        path: "/admin",
        name: "管理",
        icon: <CrownOutlined />,
        // 只有管理员可以访问
        access: Access_Enum.ADMIN,
        children: [
            {
                path: "/admin/user",
                name: "用户管理",
                access: Access_Enum.ADMIN,
            }, {
                path: "/admin/bank",
                name: "题库管理",
                access: Access_Enum.ADMIN,
            }, {
                path: "/admin/question",
                name: "题目管理",
                access: Access_Enum.ADMIN,
            },
        ],
    },
] as MenuDataItem[];

//根据全部路径查找菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
    return findMenuByPath(menus, path);
}

//根据路径查找菜单(递归)
export const findMenuByPath = (menus: MenuDataItem[], path: string): MenuDataItem | null => {
    for (const menu of menus) {
        if (menu.path === path) {
            return menu;
        }
        //递归遍历子菜单
        if (menu.children) {
            const matchedMenuItem: MenuDataItem | null = findMenuByPath(menu.children, path);
            if (matchedMenuItem) {
                return matchedMenuItem;
            }
        }
    }
    return null;
}

import { MenuDataItem } from "@ant-design/pro-components";
import { menus } from "../../confg/menu";
import checkAccess from "./checkAccess";

//根据登录用户权限，过滤出可以访问的菜单
const getAccessibelMenus = (loginUser: API.LoginUserVO, menuItems: MenuDataItem[] = menus) => {
    return menuItems.filter((item: MenuDataItem): boolean => {
        if (!checkAccess(loginUser, item.access)) {
            return false;
        }
        if (item.children) {
            item.children = getAccessibelMenus(loginUser, item.children);
        }
        return true;
    })

};

export default getAccessibelMenus;
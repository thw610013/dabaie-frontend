//统一权限校验拦截器
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { usePathname } from "next/navigation";
import { MenuDataItem } from "@ant-design/pro-components";
import { findAllMenuItemByPath } from "../../confg/menu";
import Access_Enum from "./accessEnum";
import checkAccess from "./checkAccess";
import Forbidden from "@/app/forbidden";

const AccessLayout: React.FC<Readonly<{
    children: React.ReactNode;
}>> = ({ children }) => {
    //获取当前路径
    const pathName: string = usePathname();
    //获取当前登录的用户
    const loginUser = useSelector((state: RootState) => state.loginUser);
    //获取当前路径需要的权限
    const menu: MenuDataItem | null = findAllMenuItemByPath(pathName);
    //防止菜单没有配置权限，默认设置为不需要权限
    const needAccess: string = menu?.access ?? Access_Enum.NOT_LOGIN;
    //校验权限
    const canAccess: boolean = checkAccess(loginUser, needAccess);
    //如果不能访问
    if (!canAccess) {
        return <Forbidden />;
    }

    return children;

};

export default AccessLayout;

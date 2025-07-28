import Access_Enum from "./accessEnum";

const checkAccess = (loginUser: API.LoginUserVO, needAccess: string = Access_Enum.NOT_LOGIN): boolean => {
    //1.获取当前登录用户具有的权限(如果没有登录，则默认没有权限)
    const loginUserAccess: string = loginUser?.userRole ?? Access_Enum.NOT_LOGIN;

    //如果页面不需要任何权限
    if (needAccess === Access_Enum.NOT_LOGIN) {
        return true;
    }

    //如果页面需要登录才能访问 
    if (needAccess === Access_Enum.USER) {
        //如果用户未登录
        if (loginUserAccess === Access_Enum.NOT_LOGIN) {
            return false;
        }
    }

    //如果需要管理员才能访问
    if (needAccess === Access_Enum.ADMIN) {
        //必须要有管理员权限，如果没有，表示无权限访问
        if (loginUserAccess !== Access_Enum.ADMIN) {
            return false;
        }
    }

    return true;

}

export default checkAccess;
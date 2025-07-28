import Access_Enum from "@/access/accessEnum";

// 默认用户
export const DEFAULT_USER: API.LoginUserVO = {
    userName: "未登录",
    userProfile: "暂无简介",
    userAvatar: "/assets/notLoginUser.png",
    //未登录的权限
    userRole: Access_Enum.NOT_LOGIN,
};

import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import { useEffect, useState } from "react";
import { addUserSignInUsingPost } from "@/api/userController";
import { message } from "antd";

/**
 * 用户签到
 * @param props
 * @constructor
 */
const useAddUserSignInRecord = () => {
    // 加载状态
    const [loading, setLoading] = useState<boolean>(true);
    // 请求后端
    const doFetch = async () => {
        setLoading(true);
        try {
            await addUserSignInUsingPost({});

        } catch (e) {
            // @ts-ignore
            message.error("签到失败" + e.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        doFetch();
    }, []);

    return { loading }
};

export default useAddUserSignInRecord;

import { Button, Result } from "antd";
// 无权限访问页面
const Forbidden = () => {
    return (
        <Result status="403" title="403" subTitle="Sorry, you are not authorized to access this page." extra={<Button type="primary">返回首页</Button>} />
    )
}

export default Forbidden;
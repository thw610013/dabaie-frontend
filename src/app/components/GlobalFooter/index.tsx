import React from "react";
import './index.css'

// 全局底部组件
export default function GlobalFttoer() {
    const currentYear = new Date().getFullYear();
    return (<div
        className="global-footer" >

        <div>
            ©️ {currentYear} 大白鹅博客 </div>
        <div>by Ant Design</div>

    </div>)

}
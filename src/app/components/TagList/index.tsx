import React from "react";
import './index.css'
import { Tag } from "antd";

// 标签列表组件

interface Props {
    // 指定数据类型
    tagList?: string[];
}
const TagList = (props: Props) => {
    const { tagList = [] } = props;
    return (<div
        className="tag-list" >
        {tagList.map((tag) => {
            return <Tag key={tag}>{tag}</Tag>
        })}
    </div>
    )
}

export default TagList;
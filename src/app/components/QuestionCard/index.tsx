"use client"
import React from "react";
import './index.css'
import { Avatar, Card, List, Typography } from "antd";
import Link from "next/link";
import Title from "antd/es/typography/Title";
import TagList from "../TagList";
import MdViewer from "../MdViewer";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecords";
// 标签列表组件

// 题目卡片
interface Props {
    // 指定数据类型
    question?: API.QuestionVO;
}
const Questioncard = (props: Props) => {
    const { question = [] } = props;

    // 进入到题目详情页面就签到 -- 钩子
    useAddUserSignInRecord();

    return (<div
        className="question-card" >
        <Card>
            {/* 用 leve=1 来让搜索引擎爬虫增加被检索概率 */}
            <Title level={1} style={{ fontSize: 24 }}>
                {/* @ts-ignore */}
                {question.title}
            </Title>
            {/* @ts-ignore */}
            <TagList tagList={question.tagList} />
            <div style={{ marginTop: 16 }}>
                {/* @ts-ignore */}
                <MdViewer value={question.content} />
            </div>
        </Card>
        <div style={{ marginTop: 16 }}>
            <Card title="推荐答案">
                {/* @ts-ignore */}
                <MdViewer value={question.answer} />
            </Card>
        </div>

    </div>
    )
}

export default Questioncard;
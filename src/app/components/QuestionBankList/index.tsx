"use client"
import React from "react";
import './index.css'
import { Avatar, Card, List, Typography } from "antd";
import Link from "next/link";
// 标签列表组件

//题库列表组件
interface Props {
    // 指定数据类型
    questionBankList?: API.QuestionBankVO[];
}
const QuestionBankList = (props: Props) => {
    const { questionBankList = [] } = props;

    const questionBankView = (questionBank: API.QuestionBankVO) => {
        return (
            <Card>
                <Link href={`/bank/${questionBank.id}`}>
                    <Card.Meta avatar={<Avatar src={questionBank.picture} />} title={questionBank.title}
                        description={
                            // ant 组件 超过 1 行自动缩略，实现表格对齐
                            <Typography.Paragraph type="secondary" ellipsis={{ rows: 1 }} style={{ marginBottom: 0 }}>
                                {questionBank.description}
                            </Typography.Paragraph>
                        }
                    />
                </Link>
            </Card>
        )
    }

    return (<div
        className="question-bank-list" >
        {/* 此处为了实现响应式布局，随着窗口大小改变列数 */}
        <List
            grid={({ gutter: 16, column: 4, xs: 1, sm: 2, md: 3, lg: 3 })}
            dataSource={questionBankList}
            renderItem={(item) => {
                return <List.Item>
                    {questionBankView(item)}
                </List.Item>
            }}
        />
    </div>
    )
}

export default QuestionBankList;
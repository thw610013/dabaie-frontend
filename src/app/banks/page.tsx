"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex, message } from "antd";
import "./index.css";

import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "../components/QuestionBankList";

/**
 * 主页
 * @constructor
 */
export default async function BanksPage() {

    let questionBankList: any[] = [];
    try {
        const res = await listQuestionBankVoByPageUsingPost({ pageSize: 200, sortField: "createTime", sortOrder: "descend" })
        questionBankList = res.data?.records ?? [];
    } catch (e: any) {
        message.error("获取题库失败" + e.message)
    }

    return <div id="banksPage" className="max-width-content">

        <Title level={3}>
            题库大全
        </Title>

        <div>
            {/* 展示题库列表 */}
            <QuestionBankList questionBankList={questionBankList} />
        </div>
        <Divider />

    </div>;
}

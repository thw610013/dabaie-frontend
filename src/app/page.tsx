"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex, message } from "antd";
import "./index.css";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionBankList from "./components/QuestionBankList";
import QuestionList from "./components/QuestionList";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {

  let questionBankList: any[] = [];
  let questionList: any[] = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({ pageSize: 12, sortField: "createTime", sortOrder: "desc" })
    questionBankList = res.data?.records ?? [];
  } catch (e: any) {
    message.error("获取题库失败" + e.message)
  }

  try {
    const res = await listQuestionVoByPageUsingPost({ pageSize: 12, sortField: "createTime", sortOrder: "desc" })
    questionList = res.data?.records ?? [];
  } catch (e: any) {
    message.error("获取题目失败" + e.message)
  }

  return <div id="homePage" className="max-width-content">
    <Flex justify="space-between" align="center">
      <Title level={3}>
        最新题库
      </Title>
      <Link href={"/banks"}>查看更多</Link>
    </Flex>

    <div>
      {/* 展示题库列表 */}
      <QuestionBankList questionBankList={questionBankList} />
    </div>
    <Divider />
    <Flex justify="space-between" align="center">
      <Title level={3}>
        最新题目
      </Title>
      <Link href={"/banks"}>查看更多</Link>
    </Flex>
    <div>
      <QuestionList questionList={questionList} />
    </div>
  </div>;
}

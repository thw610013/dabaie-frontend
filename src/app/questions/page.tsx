"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex, message } from "antd";
import "./index.css";

import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionTable from "../components/QuestionTable";
import { title } from "process";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  // 获取 url 的查询参数
  const { q: searchText } = searchParams;

  let questionList: any[] = [];
  let total: number = 0;
  try {
    const res = await listQuestionVoByPageUsingPost({ title: searchText, pageSize: 12, sortField: "createTime", sortOrder: "descend" })
    questionList = res.data?.records ?? [];
    total = res.data?.total ?? 0;
  } catch (e: any) {
    message.error("获取题目列表失败" + e.message)
  }

  return <div id="QuestionsPage" className="max-width-content">

    <Title level={3}>
      题目大全
    </Title>

    <div>
      {/* 展示题库列表 */}
      <QuestionTable defaultQuestionList={questionList} defaultTotal={total} defaultSearchParams={{ title: searchText }} />
    </div>
    <Divider />

  </div>;
}

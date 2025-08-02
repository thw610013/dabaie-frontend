import Title from "antd/es/typography/Title";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { Flex } from "antd";
import "./index.css";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu";
import { Content } from "antd/es/layout/layout";
import QuestionCard from "@/app/components/QuestionCard";
import Link from "next/link";

/**
 * 题库题目详情页面
 * @constructor
 */
// @ts-ignore
export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;

  let bank = undefined;

  // 获取题库详情
  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = bankRes.data;
  } catch (e) {
    // @ts-ignore
    console.error("获取题库详情失败，" + e.message);
  }

  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  // 获取题目详情
  let qeustion = undefined;

  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    qeustion = res.data;
  } catch (e) {
    // @ts-ignore
    console.error("获取题目详情失败，" + e.message);
  }

  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  if (!qeustion) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  // @ts-ignore
  const questionMenuItemList = (bank.questionPage?.records ?? []).map(q => {
    return {
      // 加入超链接
      label: <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>,
      key: q.id
    }
  })

  return (
    <div id="bankQuestionPage" >
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {/* @ts-ignore */}
            {bank.title}
          </Title>
          {/* 天然支持选中高亮  selectedKeys  */}
          <Menu items={questionMenuItemList} selectedKeys={[questionId]} />

        </Sider>
        <Content>
          {/* @ts-ignore */}
          <QuestionCard question={qeustion} />
        </Content>
      </Flex>

    </div>
  );
}

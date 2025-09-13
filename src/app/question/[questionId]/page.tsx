import Title from "antd/es/typography/Title";
import { Flex } from "antd";
import "./index.css";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { Content } from "antd/es/layout/layout";
import QuestionCard from "@/app/components/QuestionCard";

/**
 * 题库题目详情页面
 * @constructor
 */
// @ts-ignore
export default async function BankQuestionPage({ params }) {
  const { questionId } = params;

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

  if (!qeustion) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  return (
    <div id="bankQuestionPage" >
      <Flex gap={24}>

        <Title level={4} style={{ padding: "0 20px" }}></Title>

        <Content>
          {/* @ts-ignore */}
          <QuestionCard question={qeustion} />
        </Content>
      </Flex>

    </div>
  );
}

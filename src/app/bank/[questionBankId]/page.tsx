import Title from "antd/es/typography/Title";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import QuestionList from "../../components/QuestionList";
import { Avatar, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import "./index.css";

/**
 * 题库详情页面
 * @constructor
 */
// @ts-ignore
export default async function BankPage({ params }) {
  const { questionBankId } = params;

  let bank = undefined;

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

  let firstQuestionId: number | undefined;
  // @ts-ignore
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    // @ts-ignore
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          // @ts-ignore
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {/*  @ts-ignore */}
              {bank.title}
            </Title>
          }
          description={
            <div>
              {/* @ts-ignore */}
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button type="primary" shape="round" href={`/bank/${questionBankId}/question/${firstQuestionId}`} target="_blank" disabled={!firstQuestionId}>开始刷题</Button>
            </div>

          }
        ></Meta>
      </Card>
      <div style={{ marginBottom: 16 }} />
      {/* @ts-ignore */}
      <QuestionList questionBankId={questionBankId} questionList={bank.questionPage?.records ?? []} cardTitle={`题目列表(${bank.questionPage?.total || 0} )`} />
    </div>
  );
}


import { Button, message, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { Form } from 'antd';
import { batchRemoveQuestionsFromBankUsingPost } from '@/api/questionBankQuestionController';
import { useEffect } from 'react';
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController';

interface Props {
  questionIdList?: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量移除题目弹窗
 * @param props
 * @constructor
 */
const BatchRemoveQuestionsToBankModal: React.FC<Props> = (props) => {
  const { questionIdList, visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([])

  /**
 * 提交
 *
 * @param row
 */
  const doSubmit = async (values: API.QuestionBankQuestionBatchRemoveRequest) => {
    const hide = message.loading('正在操作');
    const questionBankId = values.questionBankId;
    if (!questionBankId) return;
    try {
      await batchRemoveQuestionsFromBankUsingPost({
        questionBankId, questionIdList
      });
      hide();
      message.success('操作成功');
      onSubmit?.()
    } catch (error: any) {
      hide();
      message.error('操作失败' + error.message);

    }
  };

  // 获取题库列表
  const getQuestionBankList = async () => {
    const pageSize = 200;
    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend"
      });
      // @ts-ignore
      setQuestionBankList(res.data?.records ?? [])
    } catch (e) {
      // @ts-ignore
      console.error("获取题库列表失败，" + e.message);
    }
  }

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
    <Modal
      title={'批量从题库移除题目'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form style={{ marginTop: 24 }} form={form} onFinish={doSubmit}>
        <Form.Item label="选择题库" name="questionBankId" >
          <Select
            style={{ width: "100%" }}
            options={
              questionBankList.map(questionBank => {
                return {
                  label: questionBank.title,
                  value: questionBank.id
                }
              })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BatchRemoveQuestionsToBankModal;

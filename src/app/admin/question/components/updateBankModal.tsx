
import { message, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { Form } from 'antd';
import { addQuestionBankQuestionUsingPost, deleteQuestionBankQuestionUsingPost, listQuestionBankQuestionByPageUsingPost } from '@/api/questionBankQuestionController';
import { useEffect } from 'react';
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController';

interface Props {
  questionId?: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 更新所属题库弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([])

  // 获取所属题库列表
  const getCurrentQuestionBankIdList = async () => {
    try {
      const res = await listQuestionBankQuestionByPageUsingPost({
        questionId,
        pageSize: 20,
      });
      // @ts-ignore
      const list = (res.data.records ?? []).map((item) => item.questionBankId);
      form.setFieldValue("questionBankIdList" as any, list);
    } catch (e) {
      // @ts-ignore
      console.error("获取题目所属题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    if (questionId) {
      getCurrentQuestionBankIdList();
    }
    // @ts-ignore
  }, [questionId]);
  // 获取题库列表
  const getQuestionBankList = async () => {
    // 题库数量不多，直接全量获取
    const pageSize = 200;
    try {
      const questionBankRes = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      // @ts-ignore
      setQuestionBankList(questionBankRes.data.records ?? []);
    } catch (e) {
      // @ts-ignore
      console.error("获取题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
    <Modal
      title={'更新所属题库'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form style={{ marginTop: 24 }} form={form}>
        <Form.Item label="所属题库" name="questionBankIdList" >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            options={
              questionBankList.map(questionBank => {
                return {
                  label: questionBank.title,
                  value: questionBank.id
                }
              })}
            // 用户选中添加触发
            onSelect={async (value) => {
              const hide = message.loading("正在更新")
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value
                })
                hide();
                message.success("更新成功")
              } catch (e) {
                hide();
                // @ts-ignore
                message.error("更新失败，" + e.message)
              }
            }}
            // 用户选中删除触发
            onDeselect={async (value) => {
              const hide = message.loading("正在更新")
              try {
                await deleteQuestionBankQuestionUsingPost({
                  id: value
                })
                hide();
                message.success("更新成功")
              } catch (e) {
                hide();
                // @ts-ignore
                message.error("更新失败，" + e.message)
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateBankModal;

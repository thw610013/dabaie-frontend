"use client"

import { listQuestionVoByPageUsingPost } from '@/api/questionController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { ReactNode, useRef, useState } from 'react';
import TagList from '@/app/components/TagList';
import Link from 'next/link';

// 每个组件都要定义属性
interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  // 默认搜素条件
  defaultSearchParams?: API.QuestionQueryRequest;

}
/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC<Props> = (props: Props) => {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;

  const actionRef = useRef<ActionType>();
  // 题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(defaultQuestionList || []);
  // 题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  // 用于判断是否首次加载
  const [init, setInit] = useState<boolean>(true);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [

    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      render: (_: ReactNode, record: API.QuestionVO) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>
      }
    },

    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_: ReactNode, record: API.QuestionVO) => {
        return < TagList tagList={record.tagList} />
      }
    },
  ];

  return (
    <div className="question-table">
      <ProTable<API.Question>
        actionRef={actionRef}
        size='middle'
        search={{
          labelWidth: "auto",
        }}
        form={{ initialValues: defaultSearchParams }}
        dataSource={questionList}

        pagination={{
          pageSize: 12,
          showTotal: (total): string => `总计${total}条`,
          total: total,
          showSizeChanger: false
        }}
        request={async (params, sort, filter) => {
          // 首次请求
          if (init) {
            setInit(false);
            if (defaultQuestionList && defaultTotal) {
              return {
                data: defaultQuestionList,
                total: defaultTotal,
              };
            }
          }

          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] || 'desc';

          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          // 更新结果
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          setQuestionList(newData);
          setTotal(newTotal);

          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>

  );
};
export default QuestionTable;

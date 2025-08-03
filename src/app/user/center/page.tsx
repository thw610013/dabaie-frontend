"use client";
import { Avatar, Card, Col, Divider, Flex, message, Row } from "antd";
import "./index.css";
import { RootState } from "../../../stores";
import { useSelector } from "react-redux";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";
import CalendarChart from "./componments/CalendarChart";

/**
 * 用户中心页面
 * @constructor
 */
export default function UserCenterPage({ }) {
  // 获取用户登录信息 
  // @ts-ignore
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const user = loginUser;
  // 控制菜单栏的 Tab 高亮
  const [activeTabKey, setActiveTabKey] = useState<String>("record");

  // try {
  //   const res =  listQuestionVoByPageUsingPost({ title: searchText, pageSize: 12, sortField: "createTime", sortOrder: "descend" })
  //   questionList = res.data?.records ?? [];
  //   total = res.data?.total ?? 0;
  // } catch (e: any) {
  //   message.error("获取题目列表失败" + e.message)
  // }

  return <div id="userCenterPage" className="max-width-content">
    <Row gutter={[16, 16]}>

      {/* left */}
      <Col xs={24} md={6}>

        <Card style={{ textAlign: "center" }}>
          {/* 拉开间距 */}
          <div style={{ marginBottom: 16 }} />
          {/* @ts-ignore */}
          <Avatar src={user.userAvatar} size={72} />
          <div style={{ marginBottom: 16 }} />
          {/* @ts-ignore */}
          <Card.Meta
            title={<Title level={4} style={{ marginBottom: 0 }}>{user.userName}</Title>}
            description={<Paragraph type="secondary">{user.userProfile}</Paragraph>}
          >
          </Card.Meta >
        </Card>
      </Col>

      {/* right */}
      <Col xs={24} md={18}>
        <Card tabList={[
          {
            key: "record",
            label: "刷题记录"
          },
          {
            key: "others",
            label: "其他"
          }
        ]}
          // @ts-ignore
          activeTabKey={activeTabKey}
          onTabChange={(key: string) => {
            setActiveTabKey(key);
          }}
        >
          {activeTabKey === 'record' && <><CalendarChart /></>}
          {activeTabKey === 'others' && <div>其他</div>}
        </Card>
      </Col>
    </Row>
  </div>;
}

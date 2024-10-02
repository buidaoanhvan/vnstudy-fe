"use client";

import { Typography, Table, Flex, Tag, Space } from "antd";
import { useEffect, useState } from "react";
import { getListStudent } from "@/utils/api";
export default function DanhSachHocSinhPage() {
  const [listStudent, setListStudent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getListStudent();
      setListStudent(data.data);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "parentPhone",
    },
  ];

  return (
    <section>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Typography.Title level={4}>Danh sách học sinh</Typography.Title>
        <Table
          dataSource={listStudent}
          columns={columns}
          rowKey={(record: any) => record.id}
          expandable={{
            expandedRowRender: (record: any) => (
              <Flex gap={16} vertical>
                <Typography.Text>
                  Phụ huynh: {record.parentName}
                </Typography.Text>
                <Typography.Text>Số dư: {record.balance}</Typography.Text>
                <Space direction="horizontal" size={8}>
                  <Typography.Text>Lớp học:</Typography.Text>
                  {record.classes.map((item: any) => (
                    <Tag>{item.name}</Tag>
                  ))}
                </Space>
              </Flex>
            ),
          }}
        />
      </Space>
    </section>
  );
}

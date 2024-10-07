"use client";
import { Table, Typography, Tag, Space } from "antd";
import { useEffect, useState } from "react";
import { getListClass } from "@/utils";
import Link from "next/link";

const columns = [
  {
    title: "Tên lớp",
    dataIndex: "name",
    key: "name",
    render: (text: string, record: any) => (
      <Link href={`/lop-hoc/${record.id}`}>{text}</Link>
    ),
  },
  {
    title: "Môn học",
    dataIndex: ["subject", "name"],
    key: "subject",
    render: (text: string) => <Tag color="blue">{text}</Tag>,
  },
  {
    title: "Số lượng",
    dataIndex: ["_count", "StudentClass"],
    key: "StudentClass",
  },
  {
    title: "Học phí",
    dataIndex: "price",
    key: "price",
    render: (text: string) => (
      <Typography.Text>{Number(text).toLocaleString("vi-VN")}đ</Typography.Text>
    ),
  },
  {
    title: "Giáo viên",
    dataIndex: ["teacher", "name"],
    key: "name",
  },
];

export default function ClassListPage() {
  const [listClass, setListClass] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListClass();
      setListClass(res.data);
    };
    fetchData();
  }, []);

  return (
    <Space direction="vertical" size={8} style={{ width: "100%" }}>
      <Typography.Title level={4}>Danh sách lớp học</Typography.Title>
      <Table
        dataSource={listClass}
        columns={columns}
        rowKey={(row: any) => row.id}
        scroll={{ x: 500 }}
        pagination={{ pageSize: 8 }}
        size="small"
      />
    </Space>
  );
}

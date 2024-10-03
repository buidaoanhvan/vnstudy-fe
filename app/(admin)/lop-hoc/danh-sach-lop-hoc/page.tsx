"use client";
import { Table, Typography, Tag } from "antd";
import { useEffect, useState } from "react";
import { getListClass } from "@/utils";

const columns = [
  {
    title: "Tên lớp",
    dataIndex: "name",
    key: "name",
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
    <section>
      <Table
        dataSource={listClass}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(row: any) => row.id}
        scroll={{ x: 500 }}
      />
    </section>
  );
}

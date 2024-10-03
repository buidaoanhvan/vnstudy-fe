"use client";

import { Typography, Table, Flex, Tag, Space } from "antd";
import { useEffect, useState } from "react";
import { getListStudent } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function DanhSachHocSinhPage() {
  const [listStudent, setListStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getListStudent();
      setListStudent(data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <Typography.Link onClick={() => router.push(`/hoc-sinh/${record.id}`)}>
          {text}
        </Typography.Link>
      ),
    },
    {
      title: "Số dư",
      dataIndex: "balance",
      render: (text: string) => (
        <Typography.Text>
          {Number(text).toLocaleString("vi-VN")}đ
        </Typography.Text>
      ),
    },
    {
      title: "Lớp",
      dataIndex: "classes",
      render: (text: any) => (
        <Space size={8} direction="vertical">
          {text.map((item: any) => (
            <Tag color="blue" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Phụ huynh",
      dataIndex: "parentName",
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
          loading={loading}
          dataSource={listStudent}
          columns={columns}
          rowKey={(record: any) => record.id}
          scroll={{ x: 600 }}
        />
      </Space>
    </section>
  );
}

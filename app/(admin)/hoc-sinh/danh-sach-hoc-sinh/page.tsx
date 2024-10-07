"use client";

import { Typography, Table, Input, Tag, Space } from "antd";
import { useEffect, useState } from "react";
import { getListStudent, searchStudent } from "@/utils";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";


export default function DanhSachHocSinhPage() {
  const [listStudent, setListStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { width, height } = useWindowSize();

  const handleSearch = (value: any) => {
    setSearchTerm(value.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    if (!searchTerm) {
      const data = await getListStudent();
      setListStudent(data.data);
      setLoading(false);
      return;
    }
    const data = await searchStudent(searchTerm);
    setListStudent(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(searchTerm);
  }, [searchTerm]);

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
      dataIndex: ["StudentClass"],
      render: (text: any) => (
        <Space size={8} direction="vertical">
          {text.map((item: any) => (
            <Tag color="blue" key={item.id}>
              {item.class.name}
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
        <Input.Search placeholder="Tìm kiếm học sinh" onChange={handleSearch} />
        <Table
          loading={loading}
          dataSource={listStudent}
          columns={columns}
          rowKey={(record: any) => record.id}
          scroll={{ x: 600, y:  height - 340}}
        />
      </Space>
    </section>
  );
}

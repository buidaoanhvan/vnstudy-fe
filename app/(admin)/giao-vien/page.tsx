"use client";

import {
  Form,
  Input,
  Button,
  Select,
  App,
  Typography,
  Space,
  Table,
  DatePicker,
} from "antd";
import { getListSubject, createTeacher, getListTeacher } from "@/utils";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function TeacherPage() {
  const [listSubject, setListSubject] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const fetchData = async () => {
    const data = await getListSubject();
    const dataTeacher = await getListTeacher();
    setListSubject(data.data);
    setListTeacher(dataTeacher.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values: any) => {
    const data = await createTeacher(values);
    if (data.errorCode == "00") {
      message.success("Tạo giáo viên thành công");
      //clear form
      form.resetFields();
      fetchData();
    } else {
      message.error(data.message);
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Môn dạy",
      dataIndex: ["subject", "name"],
      key: "name",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: any) => dayjs(date).format("DD/MM/YYYY"),
    },
  ];

  return (
    <Space direction="vertical" size={8} style={{ width: "100%" }}>
      <Typography.Title level={4}>Tạo giáo viên</Typography.Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
        style={{ width: "100%" }}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Họ và tên không được để trống" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Số điện thoại không được để trống" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Môn học"
          rules={[{ required: true, message: "Môn học không được để trống" }]}
          name="subjectId"
        >
          <Select placeholder="Chọn môn học">
            {listSubject.map((subject: any) => (
              <Select.Option key={subject.id} value={subject.id}>
                {subject.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
      <Typography.Title level={4}>Danh sách giáo viên</Typography.Title>
      <Table
        dataSource={listTeacher}
        columns={columns}
        rowKey={(record: any) => record.id}
        scroll={{ x: 600 }}
        pagination={{ pageSize: 4 }}
        size="small"
      />
    </Space>
  );
}

"use client";

import { Row, Col, Form, Input, Button, Select, Typography, message } from "antd";
import { useState, useEffect } from "react";
import { getListClass, registerStudent } from "@/utils";
export default function HocSinhPage() {
  const [listClass, setListClass] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListClass();
      setListClass(data.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values: any) => {
    console.log(values);
    const data = await registerStudent(values);
    if (data.errorCode == "00") {
      message.success("Đăng ký thành công");
    } else {
      message.error(data.message);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Typography.Title level={4}>Đăng ký nhập học</Typography.Title>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="Họ và tên học sinh:"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên học sinh" },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="classIds"
            label="Lớp:"
            rules={[{ required: true, message: "Vui lòng chọn lớp" }]}
          >
            <Select mode="multiple" placeholder="Chọn lớp đăng ký">
              {listClass.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name} - {item.subject.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="parentPhone"
            label="Số điện thoại:"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="parentName"
            label="Họ và tên phụ huynh:"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên phụ huynh" },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

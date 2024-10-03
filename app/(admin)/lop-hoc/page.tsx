"use client";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Typography,
  InputNumber,
  App,
} from "antd";
import { getListTeacher, getListSubject, createClass } from "@/utils";

//thêm lớp học
export default function ClassPage() {
  const { message } = App.useApp();
  const [listTeacher, setListTeacher] = useState([]);
  const [listSubject, setListSubject] = useState([]);

  const handleSubmit = async (values: any) => {
    const res = await createClass(values);
    if (res.errorCode == "00") {
      message.success("Thêm lớp học thành công");
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const teachers = await getListTeacher();
      const subjects = await getListSubject();
      setListTeacher(teachers.data);
      setListSubject(subjects.data);
    };
    fetchData();
  }, []);

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Typography.Title level={4}>Thêm lớp học</Typography.Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Tên lớp học"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên lớp học" }]}
          >
            <Input placeholder="Nhập tên lớp học" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Giáo viên" name="teacherId">
            <Select placeholder="Chọn giáo viên">
              {listTeacher.map((teacher: any) => (
                <Select.Option key={teacher.id} value={teacher.id}>
                  {teacher.name} - {teacher.subject.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Môn học" name="subjectId">
            <Select placeholder="Chọn môn học">
              {listSubject.map((subject: any) => (
                <Select.Option key={subject.id} value={subject.id}>
                  {subject.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Học phí"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập học phí" }]}
          >
            <InputNumber
              placeholder="Nhập học phí"
              controls={false}
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value!.replace(/\./g, "")}
              addonAfter="đ"
            />
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

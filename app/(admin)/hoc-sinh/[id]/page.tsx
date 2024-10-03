"use client";

import { getListClass, getStudentDetail } from "@/utils";
import {
  Row,
  Col,
  Typography,
  Space,
  Empty,
  Table,
  Button,
  Flex,
  Select,
  App,
  Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { registerClass } from "@/utils/api";

export default function HocSinhPage() {
  const { message, modal } = App.useApp();
  const { id } = useParams();
  const [formRegisterClass] = Form.useForm();
  const [student, setStudent] = useState<any>(null);
  const [classes, setClasses] = useState<any>(null);
  const columnsClass = [
    {
      title: "Lớp học",
      dataIndex: "class",
      render: (text: any) => <Typography.Text>{text.name}</Typography.Text>,
    },
    {
      title: "Môn học",
      dataIndex: ["class", "subject"],
      render: (text: any) => <Typography.Text>{text.name}</Typography.Text>,
    },
    {
      title: "Nhập học",
      dataIndex: "createdAt",
      render: (text: any) => (
        <Typography.Text>{dayjs(text).format("DD/MM/YYYY")}</Typography.Text>
      ),
    },
  ];
  const handleAddClass = () => {
    const classOptions = classes.map((item: any) => ({
      label:
        item.name + " - " + item.subject?.name + " - " + item.teacher?.name,
      value: item.id,
    }));
    modal.confirm({
      title: "Đăng ký lớp mới",
      content: (
        <Form form={formRegisterClass} layout="vertical">
          <Form.Item
            label="Lớp học"
            name="classId"
            rules={[{ required: true, message: "Vui lòng chọn lớp học" }]}
          >
            <Select options={classOptions} />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        try {
          await formRegisterClass.validateFields();
          // Xử lý khi form hợp lệ
          const { classId } = formRegisterClass.getFieldsValue();
          const res = await registerClass(student.id, classId);
          if (res.errorCode == "00") {
            message.success("Đăng ký lớp mới thành công");
            await fetchDataStudent(Number(id));
          } else {
            message.error(res.message);
          }
        } catch (error) {
          // Form không hợp lệ, không đóng modal
          return Promise.reject();
        }
      },
      okText: "Đăng ký",
      cancelText: "Hủy",
    });
  };

  const fetchDataClass = async () => {
    const classes = await getListClass();
    setClasses(classes.data);
  };

  const fetchDataStudent = async (id: number) => {
    const student = await getStudentDetail(Number(id));
    setStudent(student.data);
  };

  useEffect(() => {
    fetchDataStudent(Number(id));
    fetchDataClass();
  }, [id]);
  return (
    <section>
      {student ? (
        <Space direction="vertical" size={10} className="w-full">
          <Typography.Title level={5}>Chi tiết học sinh</Typography.Title>
          <Row gutter={[5, 5]}>
            <Col xs={24} md={12} lg={8}>
              <Space size={8}>
                <Typography.Text>Họ và tên:</Typography.Text>
                <Typography.Text strong={true}>{student?.name}</Typography.Text>
              </Space>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Space size={8}>
                <Typography.Text>Phụ huynh:</Typography.Text>
                <Typography.Text strong={true}>
                  {student?.parentName}
                </Typography.Text>
              </Space>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Space size={8}>
                <Typography.Text>Số điện thoại:</Typography.Text>
                <Typography.Text strong={true}>
                  {student?.parentPhone}
                </Typography.Text>
              </Space>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Space size={8}>
                <Typography.Text>Địa chỉ:</Typography.Text>
                <Typography.Text strong={true}>...</Typography.Text>
              </Space>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Space size={8}>
                <Typography.Text>Ghi chú:</Typography.Text>
                <Typography.Text strong={true}>...</Typography.Text>
              </Space>
            </Col>
          </Row>
          <Flex gap={10}>
            <Typography.Title level={5}>Danh sách lớp học</Typography.Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              onClick={handleAddClass}
            >
              Thêm lớp
            </Button>
          </Flex>
          <Table
            columns={columnsClass}
            dataSource={student?.StudentClass}
            rowKey={(row: any) => row.classId}
            pagination={false}
            scroll={{ x: 300 }}
          />
        </Space>
      ) : (
        <Empty description="Không tìm thấy học sinh" />
      )}
    </section>
  );
}

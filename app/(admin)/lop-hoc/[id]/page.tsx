"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getClassDetail } from "@/utils";
import { App, Col, Row, Space, Table, Typography } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

export default function classDetailPage() {
  const { message } = App.useApp();
  const { id } = useParams();
  const [classData, setClassData] = useState<any>();

  const columnsStudent = [
    {
      title: "Họ và tên",
      dataIndex: ["student", "name"],
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["student", "parentPhone"],
      key: "parentPhone",
    },
    {
      title: "Ngày vào lớp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
  ];

  const columnsSchedule = [
    {
      title: "Ngày",
      dataIndex: "timeStart",
      key: "timeStart",
      render: (timeStart: any) => dayjs(timeStart).format("DD/MM/YYYY"),
    },
    {
      title: "Bắt đầu",
      dataIndex: "timeStart",
      key: "timeStart",
      render: (timeStart: any) => dayjs(timeStart).format("HH:mm"),
    },
    {
      title: "Kết thúc",
      dataIndex: "timeEnd",
      key: "timeEnd",
      render: (timeEnd: any) => dayjs(timeEnd).format("HH:mm"),
    },
    {
      title: "Giáo viên",
      dataIndex: ["teacher", "name"],
      key: "name",
    },
    {
      title: "Điểm danh",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <Link href={`/diem-danh/${record.id}`}>Xem</Link>
      ),
    },
  ];

  //lấy lớp chi tiết theo id
  const fetchData = async () => {
    const data = await getClassDetail(Number(id));
    if (data.errorCode == "00") {
      console.log(data.data);
      setClassData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={10}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Lớp {classData?.name}
      </Typography.Title>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Typography.Text>
            Giáo viên: {classData?.teacher?.name}
          </Typography.Text>
        </Col>
        <Col xs={24} md={12}>
          <Typography.Text>
            Học phí: {classData?.price?.toLocaleString("vi-VN")}đ
          </Typography.Text>
        </Col>
        <Col xs={24} md={12}>
          <Typography.Text>Môn học: {classData?.subject?.name}</Typography.Text>
        </Col>
      </Row>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Lịch học
      </Typography.Title>
      <Table
        columns={columnsSchedule}
        dataSource={classData?.ClassSchedule}
        rowKey={(record: any) => record.id}
        pagination={{ pageSize: 5, size: "small" }}
        scroll={{ x: 600 }}
      />
      <Typography.Title level={4} style={{ margin: 0 }}>
        Học sinh
      </Typography.Title>
      <Table
        columns={columnsStudent}
        dataSource={classData?.StudentClass}
        pagination={{ pageSize: 5, size: "small" }}
        rowKey={(record: any) => record.student.id}
        scroll={{ x: 600 }}
      />
    </Space>
  );
}

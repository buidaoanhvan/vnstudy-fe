"use client";

import { Button, Space, Table, Typography, App, Row, Col } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { createAttendance, getScheduleDetail } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";

export default function Page() {
  const { id } = useParams();
  const { message } = App.useApp();
  const [studentClass, setStudentClass] = useState<any>();
  const [scheduleDetail, setScheduleDetail] = useState<any>();

  const columnsListStudent = [
    {
      title: "Học sinh",
      dataIndex: ["student", "name"],
      key: "student",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Điểm danh",
      dataIndex: ["student", "Attendance"],
      align: "center",
      render: (_: any, record: any) => {
        return (
          <Space>
            {record.student.Attendance.length > 0 &&
              (record.student.Attendance[0].status === "PRESENT" ? (
                <CheckOutlined style={{ color: "green" }} />
              ) : (
                <CloseOutlined style={{ color: "red" }} />
              ))}
          </Space>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
      render: (_: string, record: any) => {
        return (
          <Space>
            <Button
              color="primary"
              variant="solid"
              size="small"
              onClick={() => handleAttendance(record.studentId, "PRESENT")}
            >
              <CheckOutlined />
            </Button>
            <Button
              color="danger"
              variant="solid"
              size="small"
              onClick={() => handleAttendance(record.studentId, "ABSENT")}
            >
              <CloseOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleAttendance = async (studentId: number, status: string) => {
    const res = await createAttendance({
      studentId,
      status,
      classScheduleId: scheduleDetail.id,
      classId: scheduleDetail.class.id,
    });
    if (res.errorCode == "00") {
      message.success("Điểm danh thành công");
      fetchData();
    } else {
      message.error("Điểm danh thất bại");
    }
  };

  const fetchData = async () => {
    const res = await getScheduleDetail(Number(id));
    setStudentClass(res.data.class.StudentClass);
    setScheduleDetail(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Space direction="vertical" size={20} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Điểm danh [ {scheduleDetail?.class?.name} ]
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Text>
            Thời gian: {dayjs(scheduleDetail?.timeStart).format("HH:mm")} -{" "}
            {dayjs(scheduleDetail?.timeEnd).format("HH:mm")}
          </Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>
            Môn học: {scheduleDetail?.class?.subject?.name}
          </Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>
            Giáo viên: {scheduleDetail?.teacher?.name}
          </Typography.Text>
        </Col>
      </Row>

      <Typography.Title level={4} style={{ margin: 0 }}>
        Danh sách học sinh
      </Typography.Title>
      <Table
        dataSource={studentClass}
        columns={columnsListStudent as any}
        rowKey={(row: any) => row.studentId}
        pagination={false}
      />
    </Space>
  );
}

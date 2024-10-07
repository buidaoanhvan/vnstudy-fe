"use client";

import { Button, Space, Table, Typography, App, Row, Col, Input } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { createAttendance, getScheduleDetail } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { useWindowSize } from "react-use";

export default function Page() {
  const { id } = useParams();
  const { message } = App.useApp();
  const [studentClass, setStudentClass] = useState<any>();
  const [scheduleDetail, setScheduleDetail] = useState<any>();
  const [filterStudent, setFilterStudent] = useState<any>();
  const { height } = useWindowSize();

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
      message.error(res.message);
    }
  };

  const handleSearch = (value: string) => {
    const filterStudent = studentClass.filter((student: any) =>
      student.student.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterStudent(filterStudent);
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
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Điểm danh [ {scheduleDetail?.class?.name} ]
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Text>
            TG: {dayjs(scheduleDetail?.timeStart).format("HH:mm")} -{" "}
            {dayjs(scheduleDetail?.timeEnd).format("HH:mm")}
          </Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text>
            Môn: {scheduleDetail?.class?.subject?.name}
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text>
            Giáo viên: {scheduleDetail?.teacher?.name}
          </Typography.Text>
          <Button type="dashed" size="small" style={{ marginLeft: 16 }}>
            <EditOutlined />
          </Button>
        </Col>
      </Row>
      <Input.Search
        placeholder="Tìm theo tên học sinh"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table
        dataSource={filterStudent || studentClass}
        columns={columnsListStudent as any}
        rowKey={(row: any) => row.studentId}
        pagination={false}
        scroll={{ y: height - 345 }}
        size="small"
      />
    </Space>
  );
}

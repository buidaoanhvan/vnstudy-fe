"use client";
import { Space, Typography, Card, Row, Col, Flex, Button } from "antd";
import { useEffect, useState } from "react";
import { getTodaySchedules } from "@/utils";

import dayjs from "dayjs";
import Link from "next/link";

export default function Home() {
  const [dataSchedules, setDataSchedules] = useState([]);

  const fetchData = async () => {
    const res = await getTodaySchedules();
    setDataSchedules(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Space direction="vertical" size={20} style={{ width: "100%" }}>
      <Typography.Title level={4}>Lịch học hôm nay</Typography.Title>
      <Row gutter={[16, 16]}>
        {dataSchedules.map((schedule: any) => (
          <Col xs={24} md={12} key={schedule.id}>
            <Card
              type="inner"
              title={`Lớp ${schedule.class.name} - ${schedule.class.subject.name}`}
              extra={
                <Link href={`/diem-danh/${schedule.id}`}>
                  <Button type="primary">Điểm danh</Button>
                </Link>
              }
            >
              <Flex justify="space-between" vertical>
                <Typography.Text>
                  Giáo viên: {schedule.teacher.name}
                </Typography.Text>
                <Typography.Text>
                  Thời gian: {dayjs(schedule.timeStart).format("DD/MM/YYYY HH:mm")} -{" "}
                  {dayjs(schedule.timeEnd).format("HH:mm")}
                </Typography.Text>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  );
}

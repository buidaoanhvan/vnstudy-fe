"use client";

import { getListClass, getSchedules, getListTeacher } from "@/utils";
import {
  Calendar,
  App,
  Badge,
  Space,
  Typography,
  Form,
  Flex,
  Select,
  Card,
  Row,
  Col,
  Button,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

export default function LichHoc() {
  const { message, modal } = App.useApp();
  const [dataSchedules, setDataSchedules] = useState<any[]>([]);
  const [month, setMonth] = useState<number>(dayjs().month() + 1);
  const [year, setYear] = useState<number>(dayjs().year());
  const [formAddClass] = Form.useForm();
  const [classList, setClassList] = useState<any[]>([]);
  const [teacherList, setTeacherList] = useState<any[]>([]);

  const handleSelect = (date: any, data: any) => {
    modal.confirm({
      title: `Lịch học ngày ${dayjs(date).format("DD/MM/YYYY")}`,
      content: (
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Typography.Text strong={true}>Lớp đã có trong lịch:</Typography.Text>
          <Row
            gutter={[8, 8]}
            style={{ width: "100%", maxHeight: "200px", overflow: "auto" }}
          >
            {data?.schedules.length > 0 ? (
              data?.schedules.map((item: any) => (
                <Col xs={24} md={12} key={item.id}>
                  <Card
                    size="small"
                    key={item.id}
                    bordered={true}
                    style={{ backgroundColor: "#f0f2f5" }}
                  >
                    <Flex gap={2} vertical={true}>
                      <Typography.Text>Lớp: {item.class?.name}</Typography.Text>
                      <Typography.Text>
                        Giáo viên: {item.teacher?.name}
                      </Typography.Text>
                      <Typography.Text>
                        Môn học: {item.class?.subject?.name}
                      </Typography.Text>
                      <Typography.Text>
                        Thời gian: {dayjs(item.timeStart).format("HH:mm")} -{" "}
                        {dayjs(item.timeEnd).format("HH:mm")}
                      </Typography.Text>
                    </Flex>
                  </Card>
                </Col>
              ))
            ) : (
              <Typography.Text type="secondary">
                Không có lớp nào
              </Typography.Text>
            )}
          </Row>
          <Typography.Text strong={true}>
            Lớp cần thêm vào lịch:
          </Typography.Text>
          <Form layout="vertical" form={formAddClass}>
            <Form.List name="class">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...field }) => (
                    <Flex gap={8} key={key} align="baseline">
                      <Form.Item
                        {...field}
                        style={{ width: "30%" }}
                        name={[name, "class"]}
                      >
                        <Select placeholder="Chọn lớp">
                          {classList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        style={{ width: "30%" }}
                        name={[name, "teacher"]}
                      >
                        <Select placeholder="Chọn giáo viên">
                          {teacherList.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[name, "timeStart"]}
                        style={{ width: "20%" }}
                      >
                        <TimePicker
                          placeholder="Chọn giờ bắt đầu"
                          style={{ width: "100%" }}
                          format="HH:mm"
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[name, "timeEnd"]}
                        style={{ width: "20%" }}
                      >
                        <TimePicker
                          placeholder="Chọn giờ kết thúc"
                          style={{ width: "100%" }}
                          format="HH:mm"
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Flex>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm lớp
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Space>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      width: 800,
      icon: false,
      onOk: () => {
        formAddClass.validateFields().then((values) => {
          const schedules: any = [];
          if (values.class) {
            values.class.map((item: any) => {
              if (
                item.timeStart == undefined ||
                item.timeEnd == undefined ||
                item.class == undefined
              ) {
                return;
              }
              const start = dayjs(date)
                .set("hour", dayjs(item.timeStart).hour())
                .set("minute", dayjs(item.timeStart).minute())
                .set("second", 0);
              const end = dayjs(date)
                .set("hour", dayjs(item.timeEnd).hour())
                .set("minute", dayjs(item.timeEnd).minute())
                .set("second", 0);
              schedules.push({
                class: item.class,
                teacher: item.teacher ? item.teacher : null,
                timeStart: start.format("YYYY-MM-DD HH:mm:ss"),
                timeEnd: end.format("YYYY-MM-DD HH:mm:ss"),
              });
            });
          }
          console.log(schedules);
        });
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSchedules(month, year);
      const resTeachers = await getListTeacher();
      const resClass = await getListClass();
      setTeacherList(resTeachers.data);
      setDataSchedules(res.data);
      setClassList(resClass.data);
    };
    fetchData();
  }, [month, year]);

  const cellRender = (current: any, info: any) => {
    const cellData = dataSchedules.find((item) =>
      dayjs(item.date).isSame(current, "day")
    );
    if (cellData) {
      return (
        <Space
          direction="vertical"
          style={{ cursor: "pointer", height: "100%" }}
        >
          {cellData.schedules.map((item: any) => (
            <Space key={item.id}>
              <Badge status="success" />
              <Typography.Text ellipsis={true}>
                {item.class.name} - {item.teacher.name}
              </Typography.Text>
            </Space>
          ))}
        </Space>
      );
    } else {
      return (
        <Space
          direction="vertical"
          style={{ cursor: "pointer", height: "100%" }}
        >
          <Typography.Text type="secondary">---</Typography.Text>
        </Space>
      );
    }
  };

  return (
    <Calendar
      onSelect={(date, info) => {
        if (info.source === "date") {
          //lấy dữ liệu truyền vào
          const data = dataSchedules.find((item) =>
            dayjs(item.date).isSame(date, "day")
          );
          handleSelect(date, data);
        }
      }}
      cellRender={cellRender}
      onPanelChange={(date) => {
        setMonth(date.month() + 1);
        setYear(date.year());
      }}
    />
  );
}

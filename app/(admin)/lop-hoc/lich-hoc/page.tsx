"use client";

import { getListClass, getSchedules } from "@/utils";
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
import { createSchedules } from "@/utils/api";

export default function LichHoc() {
  const { message, modal } = App.useApp();
  const [dataSchedules, setDataSchedules] = useState<any[]>([]);
  const [month, setMonth] = useState<number>(dayjs().month() + 1);
  const [year, setYear] = useState<number>(dayjs().year());
  const [formAddClass] = Form.useForm();
  const [classList, setClassList] = useState<any[]>([]);

  const handleSelect = (dateSelect: any, data: any) => {
    formAddClass.resetFields();
    modal.confirm({
      title: `Lịch học ngày ${dayjs(dateSelect).format("DD/MM/YYYY")}`,
      content: (
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Typography.Text strong={true}>Lớp đã có trong lịch:</Typography.Text>
          <Row
            gutter={[8, 8]}
            style={{ width: "100%", height: 180, overflow: "auto" }}
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
                <Space size={8} style={{ width: "100%" }} direction="vertical">
                  <div style={{ height: 180, overflow: "auto" }}>
                    {fields.map(({ key, name, ...field }) => (
                      <Flex
                        key={key}
                        align="baseline"
                        vertical
                        style={{
                          borderBottom: "1px dashed #ccc",
                          marginBottom: 16,
                        }}
                      >
                        <Form.Item
                          {...field}
                          style={{ width: "100%" }}
                          name={[name, "classId"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn lớp",
                            },
                          ]}
                        >
                          <Select placeholder="Chọn lớp">
                            {classList.map((item) => (
                              <Select.Option key={item.id} value={item.id}>
                                {item.name} - {item.subject.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Flex
                          gap={8}
                          style={{ width: "100%" }}
                          align="baseline"
                        >
                          <Form.Item
                            {...field}
                            name={[name, "timeStart"]}
                            initialValue={dayjs(dateSelect)
                              .set("hour", 8)
                              .set("minute", 0)}
                            style={{ width: "50%" }}
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
                            initialValue={dayjs(dateSelect)
                              .set("hour", 8)
                              .set("minute", 0)}
                            style={{ width: "50%" }}
                          >
                            <TimePicker
                              placeholder="Chọn giờ kết thúc"
                              style={{ width: "100%" }}
                              format="HH:mm"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Flex>
                      </Flex>
                    ))}
                  </div>
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
                </Space>
              )}
            </Form.List>
          </Form>
        </Space>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      width: 800,
      icon: false,
      onOk: async () => {
        try {
          await formAddClass.validateFields();
          const arrSchedules = formAddClass.getFieldsValue().class;
          if (!arrSchedules) {
            return;
          }
          const arrSchedulesOk = arrSchedules.map((item: any) => {
            return {
              classId: item.classId,
              teacherId: classList.find((c) => c.id === item.classId)
                ?.teacherId,
              timeStart: dayjs(dateSelect)
                .set("hour", item.timeStart.get("hour"))
                .set("minute", item.timeStart.get("minute")),
              timeEnd: dayjs(dateSelect)
                .set("hour", item.timeEnd.get("hour"))
                .set("minute", item.timeEnd.get("minute")),
            };
          });
          const res = await createSchedules(arrSchedulesOk);
          if (res.errorCode == "00") {
            message.success("Tạo lịch học thành công");
            fetchData();
          } else {
            message.error("Tạo lịch học thất bại");
          }
        } catch (error) {
          return Promise.reject();
        }
      },
    });
  };

  const fetchData = async () => {
    const res = await getSchedules(month, year);
    const resClass = await getListClass();
    setDataSchedules(res.data);
    setClassList(resClass.data);
  };

  useEffect(() => {
    fetchData();
  }, [month, year]);

  const cellRender = (current: any) => {
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
                {item.class.name} - {item.class.subject.name}
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

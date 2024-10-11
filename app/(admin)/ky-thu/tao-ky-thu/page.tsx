"use client"
import { Form, Input, Space, Button, DatePicker, Typography, App } from "antd";
import { createBillingCycle } from "@/utils";
export default function TaoKyThuPage() {
    const { message } = App.useApp();

    const onFinish = async (values: any) => {
        const data = await createBillingCycle(values);
        if (data.errorCode == "00") {
            message.success("Tạo kỳ thực hành thành công");
        } else {
            message.error(data.message);
        }
    };

    return (
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <Typography.Title level={4}>Tạo kỳ thu mới</Typography.Title>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Tên kỳ thu"
                    name="title"
                    rules={[{ required: true, message: "Vui lòng nhập tên kỳ thực hành!" }]}
                >
                    <Input placeholder="Tên kỳ thu" />
                </Form.Item>
                <Form.Item
                    label="Ngày bắt đầu"
                    name="fromDate"
                    rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Ngày kết thúc"
                    name="toDate"
                    rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Nội dung"
                    name="description"
                >
                    <Input.TextArea rows={4} placeholder="Nội dung" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tạo kỳ thu
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    );
}
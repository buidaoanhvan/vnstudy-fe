"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, App, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { loginHandler, checkAuth } from "@/utils";

export default function LoginPage() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (checkAuth()) {
      router.push("/");
    }
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    const data = await loginHandler(values);
    if (data.errorCode == "00") {
      message.success(data.message);
      router.push("/");
    } else {
      message.error(data.message);
    }
    setLoading(false);
  };

  return (
    <Form style={{ width: "320px" }} onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
      >
        <Input
          placeholder="Tài khoản"
          prefix={<UserOutlined />}
          size="large"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          size="large"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
        >
          Đăng nhập
        </Button>
      </Form.Item>
      <Typography.Text>Quên mật khẩu? vui lòng liên hệ admin</Typography.Text>
    </Form>
  );
}

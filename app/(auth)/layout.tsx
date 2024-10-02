"use client";

import { Typography, Image } from "antd";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-img gap-4">
      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        height={100}
        preview={false}
        className="cursor-pointer rounded-full"
      />
      <div className="flex flex-col items-center justify-center">
        <Typography.Title
          level={2}
          style={{ fontWeight: "bold", marginBottom: 5 }}
        >
          VNSTUDY
        </Typography.Title>
        <Typography.Paragraph
          ellipsis={{ rows: 1, expandable: false }}
          type="secondary"
          style={{ width: "280px" }}
        >
          Hệ thống quản lý học sinh, trung tâm đào tạo giáo dục
        </Typography.Paragraph>
      </div>

      {children}
    </div>
  );
}

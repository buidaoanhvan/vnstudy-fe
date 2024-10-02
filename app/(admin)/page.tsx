"use client";

import Link from "next/link";
import { useUserInfo } from "@/context/UserContext";
import { Button } from "antd";
export default function Home() {
  const { userInfo, setUserInfo } = useUserInfo();

  // Hàm cập nhật dữ liệu
  const updateData = () => {
    // Cập nhật data thông qua setData
  };
  return (
    <div>
      <h1>Trang chủ</h1>
    </div>
  );
}

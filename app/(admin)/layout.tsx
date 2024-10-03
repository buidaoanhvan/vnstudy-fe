"use client";

import { useEffect, useState } from "react";
import { Layout, theme, Spin, ConfigProvider } from "antd";
import { getUserInfo } from "@/utils";
import { UserProvider } from "@/context/UserContext";
import React from "react";
import MenuBar from "@/components/menu-bar";
import HeaderBar from "@/components/header-bar";
const { Content } = Layout;
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils";
import viVN from "antd/es/locale/vi_VN";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  const locale = {
    ...viVN,
    Calendar: {
      lang: {
        ...viVN.Calendar?.lang,
        shortWeekDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        shortMonths: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
    },
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    //check auth
    async function fetchData() {
      if (!checkAuth()) {
        return router.push("/dang-nhap");
      }
      const data = await getUserInfo();
      setUserInfo(data.data);
    }
    fetchData();
  }, []);
  return (
    <UserProvider value={{ userInfo, setUserInfo }}>
      {userInfo ? (
        <ConfigProvider locale={locale}>
          <Layout style={{ height: "100vh" }}>
            <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
              <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
              <Content style={{ margin: "24px 16px 0" }}>
                <div
                  style={{
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    height: "calc(100vh - 110px)",
                    overflow: "auto",
                  }}
                >
                  {children}
                </div>
              </Content>
            </Layout>
          </Layout>
        </ConfigProvider>
      ) : (
        <Spin size="large" fullscreen={true} />
      )}
    </UserProvider>
  );
}

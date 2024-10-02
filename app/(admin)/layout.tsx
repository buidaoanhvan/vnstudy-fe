"use client";

import { useEffect, useState } from "react";
import { Layout, theme, Spin } from "antd";
import { getUserInfo } from "@/utils";
import { UserProvider } from "@/context/UserContext";
import React from "react";
import MenuBar from "@/components/menu-bar";
import HeaderBar from "@/components/header-bar";
const { Content } = Layout;
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
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
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Spin size="large" fullscreen={true} />
      )}
    </UserProvider>
  );
}

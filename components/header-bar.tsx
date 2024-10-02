"use client";
import { Layout, theme, Button, Avatar, Flex, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useUserInfo } from "@/context/UserContext";
import { logout } from "@/utils";
const { Header } = Layout;

export default function HeaderBar({ collapsed, setCollapsed }: any) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { userInfo } = useUserInfo();
  const items = [
    {
      key: "1",
      label: userInfo?.name,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        logout();
      },
    },
  ];
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Flex justify="space-between" align="center" style={{ paddingRight: 16 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />

        <Dropdown menu={{ items }}>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
            size="small"
          />
        </Dropdown>
      </Flex>
    </Header>
  );
}

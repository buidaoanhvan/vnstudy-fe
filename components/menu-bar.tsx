"use client";
import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image, Flex } from "antd";
import { useRouter, usePathname } from "next/navigation";
const { Sider } = Layout;

export default function MenuBar({ collapsed, setCollapsed }: any) {
  const { width } = window.screen;
  const router = useRouter();
  const pathname = usePathname().split("/")[1] || "/";
  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Trang chủ",
      onClick: () => {
        navHandler("/");
      },
    },
    {
      key: "lop-hoc",
      icon: <TeamOutlined />,
      label: "Lớp học",
      onClick: () => {
        navHandler("/lop-hoc");
      },
    },
    {
      key: "giao-vien",
      icon: <IdcardOutlined />,
      label: "Giáo viên",
      onClick: () => {
        navHandler("/giao-vien");
      },
    },
    {
      key: "hoc-sinh",
      icon: <UserOutlined />,
      label: "Học sinh",
      children: [
        {
          key: "nhap-hoc",
          label: "Nhập học",
          onClick: () => {
            navHandler("/hoc-sinh");
          },
        },
        {
          key: "danh-sach-hoc-sinh",
          label: "Danh sách học sinh",
          onClick: () => {
            navHandler("/hoc-sinh/danh-sach-hoc-sinh");
          },
        },
      ],
    },
  ];

  const navHandler = (key: string) => {
    if (width < 768) {
      setCollapsed(!collapsed);
    }
    router.push(key);
  };

  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      collapsed={collapsed}
      onBreakpoint={(broken) => setCollapsed(broken)}
      trigger={null}
    >
      <Flex justify="center" align="center" style={{ padding: 16 }}>
        <Image
          src="/logo.png"
          alt="logo"
          width={65}
          height={65}
          preview={false}
          className="cursor-pointer rounded-full"
        />
      </Flex>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={[pathname]}
      />
    </Sider>
  );
}

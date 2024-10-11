"use client";
import {
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  IdcardOutlined,
  AuditOutlined
} from "@ant-design/icons";
import { Layout, Menu, Image, Flex } from "antd";
import { useRouter } from "next/navigation";
const { Sider } = Layout;

export default function MenuBar({ collapsed, setCollapsed }: any) {
  const { width } = window.screen;
  const router = useRouter();
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
      children: [
        {
          key: "them-lop-hoc",
          label: "Thêm lớp học",
          onClick: () => {
            navHandler("/lop-hoc");
          },
        },
        {
          key: "danh-sach-lop-hoc",
          label: "Danh sách lớp học",
          onClick: () => {
            navHandler("/lop-hoc/danh-sach-lop-hoc");
          },
        },
        {
          key: "lich-hoc",
          label: "Lịch học",
          onClick: () => {
            navHandler("/lop-hoc/lich-hoc");
          },
        },
      ],
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
    {
      key: "ky-thu",
      icon: <AuditOutlined />,
      label: "Kỳ thu",
      children: [
        {
          key: "danh-sach-ky-thu",
          label: "Danh sách Kỳ Thu",
          onClick: () => {
            navHandler("/ky-thu");
          },
        },
        {
          key: "tao-ky-thu",
          label: "Tạo Kỳ Thu",
          onClick: () => {
            navHandler("/ky-thu/tao-ky-thu");
          },
        }
      ]
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
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
}

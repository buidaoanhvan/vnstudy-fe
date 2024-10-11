"use client"
import { Space, Typography, Flex, Button } from "antd";
export default function ChiTietKyThuPage() {
    return (
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <Flex justify="space-between">
                <Typography.Title level={4}>Danh sách học sinh thu học phí</Typography.Title>
                <Button type="primary">Tạo học phí</Button>
            </Flex>
        </Space>
    )
}
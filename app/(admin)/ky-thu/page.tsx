"use client";
import { Space, Table, Typography } from "antd";
import { getBillingCycles } from "@/utils";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";

export default function KyThuPage() {

    const [listBillingCycles, setListBillingCycles] = useState([]);

    const columns = [
        {
            title: "Kỳ thu",
            dataIndex: "title",
            key: "title",
            render: (title: any, record: any) => {
                return <Link href={`/ky-thu/${record.id}`}>{title}</Link>
            }
        },
        {
            title: "Từ ngày",
            dataIndex: "fromDate",
            key: "fromDate",
            render: (fromDate: any) => {
                return dayjs(fromDate).format("DD/MM/YYYY");
            }
        },
        {
            title: "Đến ngày",
            dataIndex: "toDate",
            key: "toDate",
            render: (toDate: any) => {
                return dayjs(toDate).format("DD/MM/YYYY");
            }
        }
    ]

    const fetchData = async () => {
        const data = await getBillingCycles();
        return setListBillingCycles(data.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (<Space size={8} style={{ width: "100%" }} direction="vertical">
        <Typography.Title level={4}>Danh sách kỳ thu</Typography.Title>
        <Table
            dataSource={listBillingCycles}
            columns={columns}
            rowKey={(row: any) => row.id}
            scroll={{ x: 500 }}
            pagination={{ pageSize: 8 }}
            size="small"
        />
    </Space>);
}
import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { listRoom } from 'src/pages/api/room';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import useSearch from 'src/hooks/useSearch';
const { Column, ColumnGroup } = Table;

type Props = {
    listData?: any,
    filter?: any
}

const PaymentHistory = ({ listData, filter }: Props) => {
    const [listRooms, setListRooms] = useState<any[]>([]);
    const { cookies, setLoading } = useUserContext();
    const userData = cookies?.user;
    const router = useRouter();
    const param = router.query;
    const id = param.id;

    const { getColumnSearchProps } = useSearch()
    useEffect(() => {
        if (id) {
            const getListRoom = async () => {
                const { data } = await listRoom(id, userData);
                setListRooms(data.data);
            };
            getListRoom();
        }
    }, [id, userData]);

    const data: any[] = listData?.map((item: any, index: any) => {
        const idRoom = item?.idRoom;
        let target = listRooms?.find((item: any) => item?._id == idRoom);
        let roomName = target?.name ?? ""
        return {
            index: index + 1,
            key: item._id,
            name: roomName,
            month: `${item?.month} / ${item?.year}`,
            date: moment(item.createdAt).format('DD/MM/YYYY'),
            value: Number(item.value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        }
    });
    const columns: any[] = [
        {
            title: 'Phòng',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Hóa đơn tháng',
            dataIndex: 'month',
            key: 'month',
            width: '30%',
            ...getColumnSearchProps('month'),
        },
        {
            title: 'Ngày thanh toán hóa đơn',
            dataIndex: 'date',
            key: 'date',
            width: '30%',
            ...getColumnSearchProps('date'),
        },
        {
            title: 'Số tiền thanh toán',
            dataIndex: 'value',
            key: 'value',
            width: '30%',
            ...getColumnSearchProps('value'),
        },
    ]
    return (
        <div className='overflow-auto bg-white rounded'>
            <Table dataSource={data} columns={columns} />
        </div>
    )
}

export default PaymentHistory
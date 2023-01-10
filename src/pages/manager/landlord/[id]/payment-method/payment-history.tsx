import React, { useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { useForm } from 'react-hook-form';
import { filterBillPayment } from 'src/pages/api/payment';
import { listRoom } from 'src/pages/api/room';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';

type Props = {
    listData?: any,
    filter?: any
}

const PaymentHistory = ({ listData, filter }: Props) => {
    const today = new Date();
    const [monthCheck, setMonth] = useState(today.getMonth() + 1);
    const [yearCheck, setYear] = useState(today.getFullYear());
    const [listRooms, setListRooms] = useState<any>();
    const { cookies, setLoading } = useUserContext();
    const userData = cookies?.user;
    const router = useRouter();
    const param = router.query;
    const id = param.id;
    const {
        handleSubmit,
        reset
    } = useForm({});


    const datePickerShow = React.useMemo(() => {
        const onChange: DatePickerProps['onChange'] = (date, dateString) => {
            setMonth(parseInt(dateString.slice(5, 7)));
            setYear(parseInt(dateString.slice(0, 4)));
            reset();
        };
        return (
            <DatePicker
                style={{ width: '200px' }}
                onChange={onChange}
                defaultValue={moment(`${yearCheck}-${monthCheck}`, 'YYYY-MM')}
                picker="month"
            />
        );
    }, [monthCheck, reset, yearCheck]);
    useEffect(() => {
        if (id) {
            const getListRoom = async () => {
                const { data } = await listRoom(id, userData);
                setListRooms(data.data);
            };
            getListRoom();
        }
    }, [id, userData]);
    const [filterBill, setFilterBill] = useState("all")
    const [filterData, setFilterData] = useState<any>()
    const onFilterBill = (event: any) => {
        setFilterBill(event.target.value);
    }
    if (filterBill === "all") {
        const getListRoom = async () => {
            const data = await listData;
            setFilterData(data);
        };
        getListRoom();
    }

    const onSubmit = async () => {
        await filterBillPayment(yearCheck, monthCheck, filterBill)
            .then((data: any) => {
                setFilterData(data?.data?.data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
    return (
        <div>
            <div className="mt-5 flex gap-2 lg:mt-0 md:gap-4 items-center">
                <select id="countries" onChange={onFilterBill} className="w-[150px] border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 focus:outline-none focus:shadow-outline">
                    <option value="all">Tất cả phòng</option>
                    {listRooms &&
                        listRooms.map((item: any, index: number) => {
                            if (item?.status === true) {
                                return (
                                    <>
                                        <option value={item._id}>{item.name}</option>
                                    </>
                                );
                            }
                        })}
                </select>

                <div className="block">
                    <Space direction="vertical">{datePickerShow}</Space>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Lọc</button>
                </form>
            </div>
            <div>
                {filterData?.length ? (
                    <div>
                        {
                            filterData && filterData?.map((item: any, index: number) =>
                                <p key={index}>{item.content}</p>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        <p>Chưa có thanh toán</p>
                    </div>
                )}

            </div>

            <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full ">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Phòng
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Hóa đơn tháng
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Số tiền đã thanh toán
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">

                                        <tr >

                                            <td className="px-6 py-4 whitespace">
                                                <div className="text-center">Phòng 1</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace">
                                                <div className="text-center">01/2023</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace">
                                                <div className="text-center">2,925,000 VNĐ</div>
                                            </td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default PaymentHistory
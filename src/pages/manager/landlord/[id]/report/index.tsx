import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { listReports, updateReport } from 'src/pages/api/notification';
import UpdateReport from 'src/pages/manager/landlord/[id]/report/update';
import { Toast } from 'src/hooks/toast';
import moment from "moment"
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';

const { Column, ColumnGroup } = Table;
interface DataType {
    _id: string;
    roomName: string;
    content: string;
    status: boolean;
}
const Resport = () => {

    const { cookies, setLoading } = useUserContext();
    const [report, setReport] = useState<any>([]);
    const userData = cookies?.user;
    const router = useRouter();
    const { id } = router.query;
    const { resetPage, setResetPage } = useUserContext()
    useEffect(() => {
        if (id) {
            const newData1 = { id, userData }

            setLoading(true);
            const getReport = async () => {
                const { data } = await listReports(newData1);
                setReport(data.data);
                setLoading(false);
            };
            getReport();
            setLoading(false);
        }

    }, [id, resetPage]);
    const onHandleUpdate = async (report: any) => {

        setLoading(true);
        await updateReport(report)

            .then((result: any) => {

                setLoading(false);
                Toast('success', 'Update thành công');

            })
            .catch((err) => {
                setLoading(false);
                Toast('error', err?.response?.data?.message);
            }).finally(() => {
                setResetPage(resetPage + 1)
            });

        // onOpen()
    };



    const noProcess = report?.filter((report: { status: boolean; }) => report.status == true)
    noProcess?.reverse()


    const processed = report?.filter((report: { status: boolean; }) => report.status == false)
    processed?.reverse()

    return (
        <div className="">
            <Table
                dataSource={processed?.map((item: { _id: any; roomName: any; content: any; createdAt: moment.MomentInput; status: any; }, index: number) => ({
                    index: index + 1,
                    key: item._id,
                    name: item.roomName,
                    content: item.content,
                    date: moment(item.createdAt).format('DD/MM/YYYY'),
                    status: item.status
                }))}
                pagination={{ pageSize: 3 }}
            >
                <Column title="STT" dataIndex="index" key="name" />

                <Column title="Phòng" dataIndex="name" key="name" />
                <Column title="Nội dung" dataIndex="content" key="content" width={500} />
                <Column title="Ngày thông báo" dataIndex="date" key="date" />
                <Column title="Trạng thái" dataIndex="status" key="date" render={(status) => {
                    return (
                        <>
                            {status == false ? <div
                                className=" p-2 mb-4 text-center text-sm text-red-700 bg-red-100 rounded-lg "
                                role="alert"
                            >

                                <div>
                                    <span className="font-medium">Chưa xử lý</span>
                                </div>
                            </div> : <div></div>}
                        </>
                    );
                }} />
                <Column title="" key="action" render={(action) => {
                    return (
                        <>
                            <UpdateReport id={action.key} onUpdate={onHandleUpdate}></UpdateReport>
                        </>
                    );
                }} />
            </Table>
            <Table
                dataSource={noProcess?.map((item: { _id: any; roomName: any; content: any; createdAt: moment.MomentInput; status: any; }, index: number) => ({
                    index: index + 1,
                    key: item._id,
                    name: item.roomName,
                    content: item.content,
                    date: moment(item.createdAt).format('DD/MM/YYYY'),
                    status: item.status
                }))}
                pagination={{ pageSize: 3 }}
            >
                <Column title="STT" dataIndex="index" key="name" />
                <Column title="Phòng" dataIndex="name" key="name" />
                <Column title="Nội dung" dataIndex="content" key="content" width={500} />
                <Column title="Ngày thông báo" dataIndex="date" key="date" />
                <Column title="Trạng thái" dataIndex="status" key="date" render={(status) => {
                    return (
                        <>
                            {status == true ? <div
                                className=" p-2 mb-4 text-center text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                role="alert"
                            >

                                <div>
                                    <span className="font-medium">Đã xử lý</span>
                                </div>
                            </div> : <div></div>}
                        </>
                    );
                }} />
                <Column title="" key="action" render={(action) => {
                    return (
                        <>
                            <UpdateReport id={action.key} onUpdate={onHandleUpdate}></UpdateReport>
                        </>
                    );
                }} />
            </Table>



        </div >
    )
}




export default Resport;
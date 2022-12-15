import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { listReports, updateReport } from 'src/pages/api/notification';
import UpdateReport from 'src/pages/manager/landlord/[id]/report/update';
import { Toast } from 'src/hooks/toast';

interface DataType {
    _id: string;
    roomName: string;
    content: string;
    status: boolean;
}
const Resport = () => {

    const { cookies, setLoading } = useUserContext();
    const [report, setReport] = useState([]);
    const userData = cookies?.user;
    const router = useRouter();
    const { id } = router.query;
    const [resetPage, setResetPage] = useState(0)

    const handleResetPage = () => {
        setResetPage(resetPage + 1)
    }
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




    }, [id,resetPage]);
    const onHandleUpdate = async (report: any) => {

        setLoading(true);
        await updateReport(report)

            .then((result: any) => {
                console.log(result);

                setLoading(false);
                Toast('success', 'Update thành công');

            })
            .catch((err) => {
                setLoading(false);
                Toast('error', err?.response?.data?.message);
            }).finally(() => {
                handleResetPage()
            });

        // onOpen()
    };

    return (
        <div className="flex flex-col">

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block align-middle  min-w-full">


                    <div className="bg-white ">
                        <table className="bg-white min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr className='bg-white'>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        STT
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        Phòng
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        Nội dung
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        Ngày thông báo
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                        Tình Trạng
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {report &&
                                    report?.map((item: any, index: number) => {
                                        return (
                                            <>
                                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {index + 1}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                        {item?.roomName}
                                                    </td>
                                                    <td className="  py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap w-[10px]  dark:text-white">
                                                        {item?.content}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item?.createdAt}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item?.status == true ? (
                                                            <div
                                                                className=" p-2 mb-4 text-center text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                                                role="alert"
                                                            >

                                                                <div>
                                                                    <span className="font-medium">Đã xử lý</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className=" p-2 text-center mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                                                role="alert"
                                                            >

                                                                <div>
                                                                    <span className="font-medium">Chưa xử lý !</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <UpdateReport id={item._id} onUpdate={onHandleUpdate}></UpdateReport>
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Resport;
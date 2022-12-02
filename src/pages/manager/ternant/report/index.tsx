import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import { listReport } from 'src/pages/api/notification';
import { useRouter } from 'next/router';

type Props = {};

const ListReport = (props: Props) => {
  const [repost, setReport] = useState<any>();
  const [codeRoom, setCodeRoom] = useState<any>();
  const idd = codeRoom && codeRoom._id;
  const { cookies, setLoading } = useUserContext();
  useEffect(() => {
    const data = cookies?.code_room;
    setCodeRoom(data as any);
  }, [cookies?.code_room]);

  useEffect(() => {
    if (codeRoom && codeRoom.idHouse) {
      const getReport = async () => {
          await listReport(idd)
        .then((result) => {
            setReport(result.data.data);
        }).catch((err) => {
            
        });

        
        setLoading(false);
      };
      getReport();
    }
  }, []);
  return (
    <>
      {' '}
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {repost &&
                    repost?.map((item: any, index: number) => {
                      return (
                        <>
                          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {index + 1}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                              {item?.roomName}
                            </td>
                            <td className="  py-4 px-6 text-sm font-medium text-gray-900  dark:text-white">
                              {item?.content}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item?.createdAt}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item?.status == true ? (
                                <div
                                  className="flex p-2 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                  role="alert"
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <svg
                                      className="w-6 h-6 dark:text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </svg>
                                  <span className="sr-only">Info</span>
                                  <div>
                                    <span className="font-medium">Đã sử lý</span>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="flex p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                  role="alert"
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="sr-only">Info</span>
                                  <div>
                                    <span className="font-medium">Chưa sử lý !</span>
                                  </div>
                                </div>
                              )}
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
    </>
  );
};

export default ListReport;

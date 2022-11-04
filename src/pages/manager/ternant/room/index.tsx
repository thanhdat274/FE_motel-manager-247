import React, { useEffect, useState } from 'react';

type Props = {};

const InfoRoom = (props: Props) => {
  const [codeRoom, setCodeRoom] = useState<any>();
  useEffect(() => {
    const { data } = JSON.parse(localStorage.getItem('code_room') as string);
    setCodeRoom(data as any);
  }, []);
  return (
    <div className="h-auto">
      <div className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Thông tin phòng
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full ">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tên phòng
                      </th>

                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Giá thuê phòng
                      </th>
                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Diện tích phòng
                      </th>
                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Số người ở tối đa
                      </th>
                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Số người ở hiện tại
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-9 py-4 whitespace text-sm text-gray-500">
                        <div className="text-center">{codeRoom?.name}</div>
                      </td>
                      <td className="px-9 py-4 whitespace text-sm text-gray-500">
                        <div className="text-center">{codeRoom?.name}</div>
                      </td>
                      <td className="px-9 py-4 whitespace text-sm text-gray-500">
                        <div className="text-center">20 m2</div>
                      </td>
                      <td className="px-9 py-4 whitespace text-sm text-gray-500">
                        <div className="text-center">{codeRoom?.maxMember}</div>
                      </td>
                      <td className="px-9 py-4 whitespace text-sm text-gray-500">
                        <div className="text-center">{codeRoom?.listMember?.length}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Thành viên trong phòng
              </h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <div className="mr-[20px]">
                <form>
                  <input
                    type="text"
                    name="keyword"
                    className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Tìm kiếm..."
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full ">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tên thành viên
                      </th>

                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        CMND/CCCD
                      </th>
                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Số điện thoại
                      </th>
                      <th
                        scope="col"
                        className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Chức vụ trong phòng
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {codeRoom?.listMember?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">{item.memberName}</div>
                        </td>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">{item.cardNumber}</div>
                        </td>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">{item.phoneNumber}</div>
                        </td>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">{item.status ? 'Chủ phòng' : 'thành viên'}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default InfoRoom;


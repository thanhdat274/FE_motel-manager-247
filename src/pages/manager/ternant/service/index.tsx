import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';

type Props = {};

const InfoService = (props: Props) => {
  const [codeRoom, setCodeRoom] = useState<any>();
  const { cookies } = useUserContext();
  useEffect(() => {
    const data = cookies?.code_room;
    setCodeRoom(data as any);
  }, [cookies?.code_room]);
  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                quản lý dịch vụ
              </h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
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
      </header>
      <main>
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
                          Tên dịch vụ
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Giá dịch vụ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {codeRoom &&
                        codeRoom?.service?.map((service: any, index: any) => {
                          const pricePar = parseInt(service?.price)
                          if (service?.status == true) {
                            return (
                              <tr key={index}>
                                <td className="px-9 py-4 whitespace text-sm text-gray-500">
                                  <div className="text-center">{service?.label}</div>
                                </td>
                                <td className="px-6 py-4 whitespace">
                                  <div className="text-center">{pricePar?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfoService;

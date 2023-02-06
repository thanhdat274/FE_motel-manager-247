import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import { readRoomData } from 'src/pages/api/room';
import { ListService } from 'src/pages/api/service';

type Props = {};

const InfoService = (props: Props) => {
  const [codeRoom, setCodeRoom] = useState<any>();
  const { cookies, setLoading } = useUserContext();
  const [roomData, setRoomData] = useState<any>();
  const [listServices, setListServices] = useState([]);
  useEffect(() => {
    const data = cookies?.code_room;
    setCodeRoom(data as any);
  }, [cookies?.code_room]);

  useEffect(() => {
    if (codeRoom?.idHouse) {
      const getService = async () => {
        const { data } = await ListService(codeRoom?.idHouse as string);
        setListServices(data.data);
        setLoading(false);
      };
      getService();
    }
  }, [codeRoom?.idHouse]);
  useEffect(() => {
    if (codeRoom?._id) {
      const getRoomData = async () => {
        const { data } = await readRoomData(codeRoom?._id)
        setRoomData(data?.data)
      };
      getRoomData();
    }
  }, [codeRoom?._id])
  return (
    <div className="h-auto">
      <div className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                quản lý dịch vụ
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
              <div className="bg-white shadow">
                  <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate uppercase">
                          dịch vụ chung
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
                    {listServices &&
                      listServices?.map((service: any, index: any) => {
                        const pricePar = parseInt(service?.price)
                        if (service?.doNotDelete == true) {
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
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full ">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className="bg-white shadow">
                  <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate uppercase">
                          dịch vụ riêng
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
                    {roomData &&
                      roomData?.service?.map((service: any, index: any) => {
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

    </div>
  );
};

export default InfoService;
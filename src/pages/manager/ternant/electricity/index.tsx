import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { getAllBillForHouse } from 'src/pages/api/billService';

type Props = {};

const listElectricity = (props: Props) => {
  var NameBuild = 'dien';
  if (typeof window !== 'undefined') {
    const [listBillData, setListBillData] = useState<any>([]);
    const codeRooms = JSON.parse(localStorage.getItem('code_room') as string);
    console.log(codeRooms._id);
    console.log(NameBuild);

    useEffect(() => {
      const getListBillData = async () => {
        // const {data} = await getAllBillForHouse(NameBuild, monthCheck, yearCheck, id)
      };
      getListBillData();
    }, []);
  }

  // const codeRooms = JSON.parse(localStorage.getItem('code_room') as string)
  // console.log(codeRooms);

  // const [rooms, setRooms] = useState();
  // var codeRooms = 'admin123';
  // useEffect(() => {
  //   const getRoom = async () => {
  //     const { data } = await getRoomBySubName(codeRooms);
  //     setRooms(data.data);
  //   };
  //   getRoom();
  // }, []);
  // console.log(demo);

  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Số lượng điện tiêu thụ hàng tháng
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
                          Tháng
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Số điện cũ
                        </th>

                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Số điện mới
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Số điện tiêu thu
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">Tháng 9</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">100 Kwh</div>
                        </td>

                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">150 Kwh</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">50 Kwh</div>
                        </td>
                      </tr>
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

export default listElectricity;

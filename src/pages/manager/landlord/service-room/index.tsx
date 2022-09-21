import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
type Props = {};

const ListServiceRoom = (props: Props) => {
  const [listServices, setListServices] = useState([]);
  useEffect(() => {
    const getService = async () => {
      try {
        const data = await axios.get('http://localhost:3001/api/service');
        setListServices(data.data);
        console.log(data);
      } catch (error) {}
    };
    getService();
  }, []);
  const remove = async (id: any) => {
    const confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
      const { data } = await axios.delete('http://localhost:3001/api/service/' + id);
      if (data) {
        setListServices(listServices.filter((item: any) => item.id !== id));
      }
    }
  };
  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Quản lý
              </h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <Link href="/manager/landlord/service-room/add-service-room" className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Thêm mới
                </button>
              </Link>
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
                          STT
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tên
                        </th>

                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Giá
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listServices &&
                        listServices.map((item: any, index) => (
                          <tr key={index}>
                            <td className="px-9 py-4 whitespace text-sm text-gray-500">
                              <div className="text-center">{index + 1}</div>
                            </td>
                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">{item.name}</div>
                            </td>

                            <td className="px-6 py-4 whitespace">
                              <div className="text-center">{item.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-center flex">
                                <Link
                                  href={`/manager/landlord/service-room/${item.id}`}
                                  className="text-amber-500 hover:text-amber-600 mx-[10px]"
                                >
                                  <FontAwesomeIcon className="w-[20px]" icon={faPenToSquare}></FontAwesomeIcon>
                                </Link>
                                <button onClick={()=>{remove(item.id)}} className="text-amber-500 hover:text-amber-600 mx-[10px]">
                                  <FontAwesomeIcon className="w-[20px]" icon={faTrash}></FontAwesomeIcon>
                                </button>
                              </div>
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
      </main>
    </div>
  );
};

export default ListServiceRoom;

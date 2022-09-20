import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {};

const RoomList = (props: Props) => {
  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Quản lý phòng
              </h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <a href="room-list/add" className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Thêm mới
                </button>
              </a>
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
                        <th scope="col" className="px-9 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          STT
                        </th>
                        <th scope="col" className="px-9 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          tên phòng
                        </th>
                        <th scope="col" className="px-9 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          giá
                        </th>
                        <th scope="col" className="px-9 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          số lượng người thuê
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-bold uppercase tracking-wider"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">1</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">phòng 1</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">10000</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">3</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-center flex">
                            <a
                              href=""
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Thêm khách
                            </a>
                            <a href="" className="text-amber-500 hover:text-amber-600 px-4 py-2">
                              <FontAwesomeIcon className="h-[20px]" icon={faPenToSquare}></FontAwesomeIcon>
                            </a>
                            <button className="btn text-red-500 hover:text-red-600 px-4 py-2">
                              <FontAwesomeIcon className="h-[20px]" icon={faTrash}></FontAwesomeIcon>
                            </button>
                          </div>
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

export default RoomList;

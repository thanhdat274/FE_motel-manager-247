import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import { supabase } from 'src/apis/supabase';
type Props = {};

const ListRoom = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  console.log('id', id);
  
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [changeData, setChangeData] = useState(0);

  const getRoom = async () => {
    try {
      const res = await supabase.from('list-room').select('*');
      if (res.data) {
        setRooms(res.data as any);
        console.log('data', res.data);
      }
      if (res.error) {
        setErrorMessage(res.error as any);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getRoom();
  }, [changeData]);

  const removeRoom = async (id: number) => {
    try {
      await supabase.from('list-room').delete().match({ id });

      swal('Xóa  thành công!', {
        icon: 'success',
      });
      setChangeData(changeData + 1);
    } catch (error) {
      swal('Đã xảy ra lỗi!', {
        icon: 'error',
      });
    }
  };

  const findData = (dataA: any) => {
    const data = dataA.filter((item: any) => item.id_house == id);
    return data;
  };
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
              <Link href={`/manager/landlord/${id}/list-room/add`}>
                <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Thêm mới
                </a>
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
                <div className="flex flex-wrap gap-[20px]">
                  {rooms &&
                    findData(rooms).map((item: any, index: React.Key | null | undefined) => {
                      return (
                        <div className="w-full max-w-[250px] border-2 p-[20px] bg-white rounded-[5px]" key={index}>
                          <h2 className="text-xl flex items-center gap-2 mb-[20px]">
                            <FontAwesomeIcon className="h-[15px]" icon={faHouse} />
                            {item.name}
                          </h2>
                          <Link
                            href="/manager/landlord/room-renter/add"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-block"
                          >
                            <a className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-block mb-[20px]">
                              Thêm khách
                            </a>
                          </Link>

                          <p className="flex items-center gap-2 mb-[20px]">
                            <FontAwesomeIcon className="h-[15px]" icon={faMoneyBill} />
                            <span className="text-red-500">
                              {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                          </p>

                          <div className="text-center flex gap-3">
                            <Link
                              href={`/manager/landlord/${id}/list-room/${item.id}/edit`}
                              className="text-amber-500 hover:text-amber-600"
                            >
                              <a className="text-amber-500 hover:text-amber-600 flex gap-1 items-center">
                                <FontAwesomeIcon className="h-[20px]" icon={faPenToSquare} /> chinh sua
                              </a>
                            </Link>
                            <button
                              onClick={() => {
                                removeRoom(item.id);
                              }}
                              className="btn text-red-500 hover:text-red-600 flex gap-1 items-center"
                            >
                              <FontAwesomeIcon className="h-[20px]" icon={faTrash} /> Xoa
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListRoom;

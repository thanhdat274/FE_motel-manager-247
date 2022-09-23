import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
type Props = {};

const data = [
  { name: 'phong so 1', status: 'phong trong' },
  { name: 'phong so 2', status: 'phong trong' },
  { name: 'phong so 3', status: 'phong trong' },
  { name: 'phong so 4', status: 'phong trong' },
  { name: 'phong so 5', status: 'phong trong' },
  { name: 'phong so 6', status: 'phong trong' },
  { name: 'phong so 7', status: 'phong trong' },
];

const ListRoom = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState([]);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/room');
        setRoom(data);
        console.log('data', data);
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);

  const remove = async (id: any) => {
    const confirm = window.confirm('Bạn chắc chắn muốn xóa?');
    if (confirm) {
      const { data } = await axios.delete('http://localhost:3001/room/' + id);
      if (data) {
        setRoom(room.filter((item: any) => item.id !== id));
      }
      swal('Bạn đã xóa thành công!', {
        icon: 'success',
      });
    }
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
                  {room &&
                    room.map((item: any, index) => {
                      return (
                        <div className="w-full max-w-[250px] border-2 p-[20px] bg-white rounded-[5px]" key={index}>
                          <h2 className="text-xl flex items-center gap-2 mb-[20px]">
                            <FontAwesomeIcon className="h-[15px]" icon={faHouse}></FontAwesomeIcon>
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
                            <FontAwesomeIcon className="h-[15px]" icon={faMoneyBill}></FontAwesomeIcon>
                            <span className="text-red-500"> {item.price}</span>
                          </p>

                          <div className="text-center flex gap-3">
                            <Link
                              href={`/manager/landlord/room-list/${item.id}`}
                              className="text-amber-500 hover:text-amber-600"
                            >
                              <a className="text-amber-500 hover:text-amber-600">
                                <FontAwesomeIcon className="h-[20px]" icon={faPenToSquare}></FontAwesomeIcon>
                              </a>
                            </Link>
                            <button
                              onClick={() => {
                                remove(item.id);
                              }}
                              className="btn text-red-500 hover:text-red-600"
                            >
                              <FontAwesomeIcon className="h-[20px]" icon={faTrash}></FontAwesomeIcon>
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

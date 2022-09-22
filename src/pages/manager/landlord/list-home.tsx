import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

type Props = {};

export const listHome = [
  {
    title: 'nha so 1',
    description: 'description nha so 1',
  },
  {
    title: 'nha so 2',
    description: 'description nha so 2',
  },
  {
    title: 'nha so 3',
    description: 'description nha so 3',
  },
  {
    title: 'nha so 4',
    description: 'description nha so 4',
  },
  {
    title: 'nha so 5',
    description: 'description nha so 5',
  },
  {
    title: 'nha so 6',
    description: 'description nha so 6',
  },
  {
    title: 'nha so 7',
    description: 'description nha so 7',
  },
  {
    title: 'nha so 8',
    description: 'description nha so 8',
  },
  {
    title: 'nha so 9',
    description: 'description nha so 9',
  },
];

const ListHome = (props: Props) => {
  const [house, setHouse] = useState([]);

  useEffect(() => {
    const getHouse = async () => {
      const { data } = await axios.get('http://localhost:3000/peoples');
      setHouse(data);
    };
    getHouse();
  }, []);
  console.log(house);

  const router = useRouter();

  console.log('landlord', router.pathname.search('/manager/landlord'));

  console.log('ternant', router.pathname.search('/manager/ternant'));

  const renderList = () => {
    return (
      <div>
        <div className="border-2">
          <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
            <div className="">
              <h2 className="pt-2 text-xl">Danh sách nhà </h2>
            </div>
            <div className="">
              <button className="float-right border-2  px-2 py-2 bg-amber-700 hover:bg-red-600 rounded">
                Thêm nhà
              </button>
            </div>
          </div>
          <div className=" my-4 mx-4  sm:grid sm:grid-cols-2  sm:gap-2 lg:grid lg:grid-cols-4  lg:gap-4 ">
            {listHome.map((item, index) => {
              return (
                <>
                  <div className="border-2 text-center  py-8 bg-gray-100  mt-3" key={index}>
                    <div className="">
                      <h1 className="">
                        <span className="bg-sky-400 border text-lg hover:bg-cyan-500 text-white hover:text-black rounded-md  font-bold p-3">
                          {item.title}
                        </span>
                      </h1>
                    </div>
                    <div className="m-3 border bg-slate-300 rounded-md text-left ">
                      <p className="p-2">{item.description}</p>
                    </div>
                    <div>
                      <div>
                        <Link href="room-list">
                          <a className="border  pr-2 pl-2 pt-1 pb-1 rounded-md bg-emerald-500 text-white hover:bg-green-800">
                            Quản lý
                          </a>
                        </Link>

                        <a
                          href=""
                          className="border mr-2 ml-2 pr-2 pl-2 pt-1 pb-1 rounded-md bg-blue-600 text-white hover:bg-sky-800"
                        >
                          Chỉnh sửa
                        </a>
                        <button className="border pr-2 pl-2 pt-1 pb-1 rounded-md bg-rose-600 text-white hover:bg-rose-800 ">
                          {' '}
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return <div className="flex flex-col">{renderList()}</div>;
};

export default ListHome;

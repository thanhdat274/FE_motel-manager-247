import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from 'src/apis/supabase';
import axios from 'axios';
import { Toast } from 'src/hooks/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLocationDot, faBars, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '@/context/UserContext';
import { listHouse, removeHouses } from 'src/pages/api/house';

const ListHome = () => {
  const { cookies, setLoading } = useUserContext();
  const [house, setHouse] = useState([]);
  const a = cookies?.user;
  useEffect(() => {
    const getHouse = async () => {
      try {
        const { data } = await listHouse(a);
        if (data.data) {
          setHouse(data.data as any);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getHouse();
  }, []);

  const removeHouse = async (_id: number, a: any) => {
    setLoading(true);

    const confirm = window.confirm('Bạn có muốn xóa không ?');
    if (confirm) {
      try {
        await removeHouses({ _id: _id, a: a }).then(() => {
          Toast('success', 'Xóa nhà thành công');
          setHouse(house.filter((item: any) => item._id !== _id));
          setLoading(false);
        });
      } catch (error) {
        Toast('error', 'Xóa nhà không thành công');
        setLoading(false);
      }
    }
  };

  const [fillter, setfillter] = useState('');

  const handleSearch = (event: any) => {
    const value = event.target.value;
    setfillter(value);
  };

  const renderList = () => {
    return (
      <div>
        <div className="border-2">
          <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
            <div className="">
              <h2 className="pt-2 text-xl font-bold ">Danh sách nhà </h2>
            </div>
            <div className="flex items-center justify-end">
              <div className="mr-[20px]">
                <form>
                  <input
                    type="text"
                    name="keyword"
                    className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Tìm kiếm..."
                    onChange={handleSearch}
                    value={fillter}
                  />
                </form>
              </div>
              <Link href="/manager/landlord/list-home/add" className=" border-2  px-2 py-2  hover:bg-red-600 rounded">
                <a
                  className="border float-right  p-2 bg-gradient-to-r from-cyan-500 to-blue-800 font-bold 
                hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-900 hover:font-bold"
                >
                  Thêm nhà
                </a>
              </Link>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-4 lg:grid lg:grid-cols-4 lg:gap-2 drop-shadow-2xl m-3">
            {house &&
              house
                .filter((val: any) => {
                  if (fillter == '') {
                    return val;
                  } else if (val.name.toLocaleLowerCase().includes(fillter.toLowerCase())) {
                    return val;
                  }
                })
                .map((item: any, index: React.Key | null | undefined) => {
                  return (
                    <>
                      <div className="border pt-3 bg-white rounded pr-2" key={index}>
                        <div className=" text-2xl rounded-md  font-bold pl-3 flex items-center">
                          <span className="pr-3">
                            <FontAwesomeIcon className="w-[20px] text-emerald-500 " icon={faHouse} />
                          </span>
                          <span>{item?.name}</span>
                        </div>
                        <div className="m-4  rounded-md text-left text-sm flex ">
                          <span className="pr-3">
                            <FontAwesomeIcon className="w-[10px]  pt-1 text-indigo-700" icon={faLocationDot} />
                          </span>
                          <span>{item?.address}</span>
                        </div>
                        <div>
                          <div className="flex flex-row pl-2 pb-4 justify-around gap-2">
                            <Link href={`${item?._id}`}>
                              <a className="text-white base-1/3 bg-sky-500 w-1/3">
                                <div className="  flex rounded-md pr-2 pl-2 pt-1 pb-1 text-[12px] font-bold">
                                  <span className="pr-2">
                                    <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]  " icon={faBars} />
                                  </span>
                                  <span>Quản lý</span>
                                </div>
                              </a>
                            </Link>
                            <Link href={`/manager/landlord/list-home/${item?._id}/edit`}>
                              <a className="text-white base-1/3 2 bg-yellow-400 w-1/3 ">
                                <div className="bg-yellow-400 flex rounded-md  pr-2 pl-2 pt-1 pb-1 text-[12px] font-bold">
                                  <span className="pr-2">
                                    <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]" icon={faPenToSquare} />
                                  </span>
                                  <span>Chỉnh sửa</span>
                                </div>
                              </a>
                            </Link>
                            <button
                              onClick={() => removeHouse(item?._id, a)}
                              className="text-white base-1/3  bg-red-500 w-1/3"
                            >
                              <div className="mt-[2px] bg-red-500 flex rounded-md  pr-2 pl-2 pt-1 pb-1 text-[12px] font-bold">
                                <span className="pr-2">
                                  <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]  " icon={faTrash} />
                                </span>
                                <span>Xóa</span>
                              </div>
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

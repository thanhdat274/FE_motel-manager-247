import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from 'src/apis/supabase';
import { Toast } from 'src/hooks/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLocationDot, faBars, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useUserContext } from '@/context/UserContext';
const ListHome = () => {
  const [house, setHouse] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [changeData, setChangeData] = useState(0);
  const { setLoading } = useUserContext();

  const getHouse = async () => {
    try {
      const res = await supabase.from('houses').select('*');
      if (res.data) {
        setHouse(res.data as any);
        console.log('data', res.data);
      }
      if (res.error) {
        setErrorMessage(res.error as any);
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log('run');

    getHouse();
  }, [changeData]);
  const router = useRouter();

  const { id } = router.query;
  console.log('id', id);

  const removeHouse = async (id: number) => {
    try {
      await supabase
        .from('houses')
        .delete()
        .match({ id })
        .then(() => {
          Toast('success', 'Xóa phòng thành công');
          setChangeData(changeData + 1);
          router.push('/manager/landlord/list-home');
        });
    } catch (error) {
      Toast('success', 'Xóa phòng không thành công');
    }
  };

  // console.log(house);

  // console.log('landlord', router.pathname.search('/manager/landlord'));

  // console.log('ternant', router.pathname.search('/manager/ternant'));

  const renderList = () => {
    return (
      <div>
        <div className="border-2">
          <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
            <div className="">
              <h2 className="pt-2 text-xl font-bold ">Danh sách nhà </h2>
            </div>
            <div className="">
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
          <div className="   sm:grid sm:grid-cols-2  sm:gap-2 lg:grid lg:grid-cols-4  lg:gap-4  drop-shadow-2xl  ">
            {house &&
              house.map((item: { id: number; name: string; address: string }, index: React.Key | null | undefined) => {
                return (
                  <>
                    <div className="   m-5 border-2  pt-3 bg-white rounded mt-3" key={index}>
                      <div className=" text-lg   rounded-md  font-bold pl-3 flex ">
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
                        <div className="flex pl-2  pb-4">
                          <Link href={`${item?.id}`}>
                            <a className="text-white  ">
                              <div className="mt-[5px] mr-2 bg-sky-500 flex rounded-md  pr-2 pl-2 pt-1 pb-1 text-[10px] font-bold">
                                <span className="pr-2">
                                  <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]  " icon={faBars} />
                                </span>
                                <span>Quản lý</span>
                              </div>
                            </a>
                          </Link>
                          <Link href={`/manager/landlord/list-home/${item?.id}/edit`}>
                            <a className="text-white ">
                              <div className="mt-[5px] mr-2 bg-yellow-400 flex rounded-md  pr-2 pl-2 pt-1 pb-1 text-[10px] font-bold">
                                <span className="pr-2">
                                  <FontAwesomeIcon className="w-[10px] text-[10px] pt-[2px]  " icon={faPenToSquare} />
                                </span>
                                <span>Chỉnh sửa</span>
                              </div>
                            </a>
                          </Link>
                          <button onClick={() => removeHouse(item?.id)} className="text-white    ">
                            <div className="mt-[2px] bg-red-500 flex rounded-md  pr-2 pl-2 pt-1 pb-1 text-[10px] font-bold">
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

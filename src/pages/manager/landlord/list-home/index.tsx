import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from 'src/apis/supabase';
import axios from 'axios';
import { Toast } from 'src/hooks/toast';
import { useUserContext } from '@/context/UserContext';

const ListHome = () => {
  const { setLoading } = useUserContext();
  const [house, setHouse] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.log('id', id);
  // const getHouse = async () => {
  //   try {
  //     const res = await supabase.from('houses').select('*');
  //     if (res.data) {
  //       setHouse(res.data as any);
  //       console.log('data', res.data);
  //     }
  //     if (res.error) {
  //       setErrorMessage(res.error as any);
  //     }
  //   } catch (error) {}
  // };

  useEffect(() => {
    console.log('run');
    const getHouse = async () => {
      try {
        const res = await axios.get('https://633505ceea0de5318a0bacba.mockapi.io/api/house');
        if (res.data) {
          setHouse(res.data as any);
          console.log('data', res.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getHouse();
  }, []);

  const removeHouse = async (id: number) => {
    console.log(id);
    setLoading(true);
    try {
      await axios.delete('https://633505ceea0de5318a0bacba.mockapi.io/api/house/' + id).then(() => {
        Toast('success', 'Xóa nhà thành công');
        setHouse(house.filter((item: any) => item.id !== id));
        setLoading(false);
      });
    } catch (error) {
      Toast('success', 'Xóa nhà không thành công');
      setLoading(false);
    }
  };

  const renderList = () => {
    return (
      <div>
        <div className="border-2">
          <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
            <div className="">
              <h2 className="pt-2 text-xl">Danh sách nhà </h2>
            </div>
            <div className="">
              <Link
                href="/manager/landlord/list-home/add"
                className="float-right border-2  px-2 py-2 bg-amber-700 hover:bg-red-600 rounded"
              >
                <a>Thêm nhà</a>
              </Link>
            </div>
          </div>
          <div className=" my-4 mx-4  sm:grid sm:grid-cols-2  sm:gap-2 lg:grid lg:grid-cols-4  lg:gap-4 ">
            {house &&
              house.map((item: any, index: React.Key | null | undefined) => {
                return (
                  <>
                    <div className="border-2 text-center  py-8 bg-gray-100  mt-3" key={index}>
                      <div className="">
                        <h1 className="">
                          <span className="bg-sky-400 border text-lg hover:bg-cyan-500 text-white hover:text-black rounded-md  font-bold p-3">
                            {item.name}
                          </span>
                        </h1>
                      </div>
                      <div className="m-3 border bg-slate-300 rounded-md text-left ">
                        <p className="p-2">{item.address}</p>
                      </div>
                      <div>
                        <div>
                          <Link href={`${item.id}`}>
                            <a className="border  pr-2 pl-2 pt-1 pb-1 rounded-md bg-emerald-500 text-white hover:bg-green-800">
                              Quản lý
                            </a>
                          </Link>
                          <Link href={`/manager/landlord/list-home/${item?.id}/edit`}>
                            <a className="border mr-2 ml-2 pr-2 pl-2 pt-1 pb-1 rounded-md bg-blue-600 text-white hover:bg-sky-800">
                              Chỉnh sửa
                            </a>
                          </Link>
                          <button
                            onClick={() => removeHouse(item.id)}
                            className="border pr-2 pl-2 pt-1 pb-1 rounded-md bg-rose-600 text-white hover:bg-rose-800 "
                          >
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

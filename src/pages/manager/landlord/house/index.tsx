import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHouse, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { listHouse, removeHouse } from 'src/pages/api/house';
import swal from 'sweetalert';

type Props = {};

const ListHome = (props: Props) => {
  const [houses, setHouse] = useState([]);

  useEffect(() => {
    const getHouse = async () => {
      const { data } = await listHouse();
      setHouse(data);
    };
    getHouse();
  }, []);

  const onHandleRemove = async (id: number) => {
    console.log(id);

    const confirm = window.confirm('Bạn có chắc chắn muốn xóa không?');
    if (confirm) {
      await removeHouse(id);
      setHouse(houses.filter((item: any) => item.id !== id));
      swal('Bạn đã cập nhật thành công!', {
        icon: 'success',
      });
    }
  };
  return (
    <div>
      <div className="border-2">
        <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
          <div className="">
            <h2 className="pt-2 text-xl">Danh sách nhà </h2>
          </div>
          <div className="">
            <Link href="/manager/landlord/house/add">
              <a className="float-right border-2  px-2 py-2 bg-amber-700 hover:bg-red-600 rounded"> Thêm nhà</a>
            </Link>
          </div>
        </div>
        <div className=" my-4 mx-4  sm:grid sm:grid-cols-2  sm:gap-2 xl:grid  xl:grid-cols-4  xl:gap-4 ">
          {houses.map((item: any, index) => {
            return (
              <>
                <div className="border-2   py-8   mt-3 bg-slate-200" key={index}>
                  <div className="">
                    <h1 className="ml-5">
                      <span className="   rounded-md  font-bold text-xl ">
                        <FontAwesomeIcon className="w-[16px] text-black" icon={faHouse} />
                        {item.name}
                      </span>
                    </h1>
                  </div>
                  <div className="m-3 border bg-slate-300 rounded-md text-left ">
                    <p className="p-2">{item.address}</p>
                  </div>
                  <div className="">
                    <div className="flex">
                      <div>
                        <Link href={`/manager/landlord/house/${item.id}`}>
                          <a className="text-sm border mr-2 ml-2 pr-2 pl-2 pt-2 pb-2 rounded-md bg-blue-600 text-white hover:bg-sky-800 flex">
                            <span>
                              <FontAwesomeIcon className="w-[16px]  text-white" icon={faPenToSquare} />
                            </span>
                            <span className="pl-2">Chỉnh sửa</span>
                          </a>
                        </Link>
                      </div>
                      <div>
                        <button
                          className=" text-sm border pr-3 pl-3 pt-2 pb-2 rounded-md bg-rose-600 text-white hover:bg-rose-800  flex"
                          onClick={() => onHandleRemove(item.id)}
                        >
                          <span>
                            <FontAwesomeIcon className="w-[16px]  text-white" icon={faTrashCan} />
                          </span>
                          <span className="pl-2">Xóa</span>
                        </button>
                      </div>
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

export default ListHome;

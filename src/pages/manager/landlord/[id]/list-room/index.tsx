import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from 'src/apis/supabase';
import swal from 'sweetalert';

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

      swal('Thêm nhà  thành công!', {
        icon: 'success',
      });
      setChangeData(changeData + 1);
    } catch (error) {
      swal('Đã xảy ra lỗi!', {
        icon: 'error',
      });
    }
  };

  const router = useRouter();

  const { id } = router.query;
  return (
    <div className="container flex flex-col ">
      <div className="flex flex-col items-end">
        <Link href={`/manager/landlord/${id}/list-room/add`}>
          <a className="text-end p-1 border ">them phong</a>
        </Link>
      </div>
      <div className="title text-center">Danh sach phong tro</div>

      <div className=" my-4 mx-4  sm:grid sm:grid-cols-2  sm:gap-2 lg:grid lg:grid-cols-4  lg:gap-4 ">
        {rooms &&
          rooms.map((item: { id: number; name: string; status: boolean }, index) => {
            return (
              <>
                <div className="border-2 text-center  py-8 bg-gray-100  mt-3" key={index}>
                  <div className="">
                    <h1 className="">
                      <span className="bg-sky-400 border text-lg hover:bg-cyan-500 text-white hover:text-black rounded-md  font-bold p-3">
                        {item?.name}
                      </span>
                    </h1>
                  </div>
                  <div className="m-3 border bg-slate-300 rounded-md text-left ">
                    <p className="p-2">{item?.status ? 'sẵn sàng' : 'chưa sẵn sàng'}</p>
                  </div>
                  <div>
                    <div>
                      <a
                        href=""
                        className="border mr-2 ml-2 pr-2 pl-2 pt-1 pb-1 rounded-md bg-blue-600 text-white hover:bg-sky-800"
                      >
                        Chỉnh sửa
                      </a>
                      <button
                        onClick={() => removeRoom(item?.id)}
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
  );
};

export default ListRoom;

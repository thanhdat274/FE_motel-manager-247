import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBooking } from 'src/pages/api/booking';
import { listRoom } from 'src/pages/api/room';
import { Toast } from 'src/hooks/toast';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';

type Props = {

  close: any 
};

const AddBooking = ({close}: Props) => {
  const [listRooms, setListRooms] = useState<any>();
  const { cookies, setLoading } = useUserContext();

  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;
  const id = param.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  useEffect(() => {
    const getListRoom = async () => {
      const { data } = await listRoom(id, userData);
      setListRooms(data.data);
    };
    getListRoom();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await createBooking(data, userData, id);
      Toast('success', 'Đặt tiền cọc thành công');
      close()
    } catch (error: any) {
      Toast('error', error.response.data.error);
    }
  };
  return (
    <div>
      <div className="border mt-5 p-2">
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Họ và tên
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                {...register('fullName', { required: true })}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/5">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Phòng
              </label>
            </div>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                {...register('idRoom', { required: true })}
              >
                {listRooms &&
                  listRooms.map((item: any, index: number) => {
                    return (
                      <>
                        <option value={item._id}>{item.name}</option>
                      </>
                    );
                  })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6 ">
            <div className="hidden">
              <div className="md:w-1/5">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Nhà
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  value={id}
                  {...register('idHouse', { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="email"
                {...register('email', { required: true })}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Số điện thoại
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                {...register('phoneNumber', { required: true })}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Tiền cọc
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                {...register('bookMoney', { required: true })}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Thời gian
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="date"
                {...register('expectTime', { required: true })}
              />
            </div>
          </div>

           
            <div className=" text-center">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Đặt cọc
              </button>
            </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddBooking;

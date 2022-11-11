import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBooking, createBookingRoom, listBooking } from 'src/pages/api/booking';
import { listRoom } from 'src/pages/api/room';
import { Toast } from 'src/hooks/toast';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';

type Props = {
  item1: any,
  item2: any

};

const AddBooking = (props: Props) => {

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

  const onCreateRoom = async (data: any) => {
    const newData = { ...data, userData: userData };
    await createBookingRoom(newData)
      .then((result: any) => {
        Toast('success', 'Thêm người vào phòng thành công');
        router.push(`/manager/landlord/${id}/list-room`);
      })
      .catch((err) => {
        console.log(err);

        Toast('error', err.response.data.error);
      });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onCreateRoom)}>
        <div className="hidden">
          <div>
            {' '}
            <input
              type="text"
              value={props.item1}
              {...register('idBooking', { required: true })}
            />
          </div>
          <div>
            {' '}
            <input
              type="text"
              value={props.item2}
              {...register('idRoom', { required: true })}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
          >
            Nhận phòng
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;

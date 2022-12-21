import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBooking, createBookingRoom, listBooking } from 'src/pages/api/booking';
import { Toast } from 'src/hooks/toast';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CardNumber from './cardNumber';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
type Props = {
  item1: any,
  item2: any

};
const AddBooking = (props: Props) => {
  const { cookies, setLoading } = useUserContext();
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);
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
    setLoading(true)
    const newData = { ...data, userData: userData };
    if (id) {
      await createBookingRoom(newData)
        .then((result: any) => {
          setLoading(false)
          Toast('success', result?.response?.data?.message);
          router.push(`/manager/landlord/${id}/list-room`);
        })
        .catch((err) => {
          setLoading(false)
          setOpen(true)
          Toast('error', err?.response?.data?.message);
        });
    };
  }
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
            className=" flex focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
          >
            <span className='pr-2'> Chuyển</span>
            <FontAwesomeIcon className="h-[15px] pt-1" icon={faArrowRight} />
          </button>
        </div>
      </form>

      <div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="w-full mb-3">
            <h2>Mời bạn nhập số CMND/CCCD</h2>
          </div>
          <CardNumber itemm1={props.item1} itemm2={props.item2} ></CardNumber>
        </Modal>
      </div>
    </div>
  );
};

export default AddBooking;

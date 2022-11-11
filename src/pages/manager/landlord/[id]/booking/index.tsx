import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { createBooking, createBookingRoom, deleteBooking, listBooking } from 'src/pages/api/booking';
import { listRoom } from 'src/pages/api/room';
import { Toast } from 'src/hooks/toast';
import AddBooking from './addBooking';

type Props = {};

const Booking = (props: Props) => {
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);
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
  const [listBookings, setListBookings] = useState<any>();
  console.log(listBookings);
  
  useEffect(() => {
    const getListBooking = async () => {
      const { data } = await listBooking(userData, id);
      setListBookings(data.data);
    };
    getListBooking();
  }, []);

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
  const onHandleRemove = async (id: any) => {
    // console.log(id);

    await deleteBooking(id, userData)
      .then((result: any) => {
        Toast('success', 'Xóa thành công');
      })
      .catch((err) => {
        Toast('error', err.response.data.error);
      });
  };

  return (
    <div>
      <div>
        <button
          onClick={onOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
        >
          Đặt cọc
        </button>
        <div>
          <div className="flex flex-col border bg-white mt-3">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          STT
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Họ và tên
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Email
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Số điện thoại
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Phòng
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Tiền cọc
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Ngày đến ở
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listBookings.length > 0 ? (
                        listBookings?.map((item: any, index: number) => {
                          return (
                            <>
                              <tr className="border-b">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.fullName}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.email}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.phoneNumber}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.fullName}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.bookMoney}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.expectTime}
                                </td>
                                <td className="flex">
                                  <div>
                                    <form action="" onSubmit={handleSubmit(onCreateRoom)}>
                                      <div className="hidden">
                                        <div>
                                          {' '}
                                          <input
                                            type="text"
                                            value={item._id}
                                            {...register('idBooking', { required: true })}
                                          />
                                        </div>
                                        <div>
                                          {' '}
                                          <input
                                            type="text"
                                            value={item.idRoom}
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
                                  <div>
                                      
                                      <button
                                        type="submit"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        onClick={() => onHandleRemove(item._id)}
                                      >
                                        Xóa
                                      </button>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <div>Không có dữ liệu</div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal open={open} onClose={onCloseModal} center>
          <div className="w-full">
            <h1 className="pt-2 text-white">
              -----------------------------------------------------------------------------------------------------------------------
            </h1>
            <hr />
            <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500">
              <div className="">
                <h2 className="pt-2 text-xl">Thông tin </h2>
              </div>
            </div>{' '}
            <AddBooking close={onCloseModal}></AddBooking>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Booking;

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
  const [listRooms, setListRooms] = useState<any>();
  var today = new Date();

  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const [listBookings, setListBookings] = useState<any>({});

  useEffect(() => {
    const getListBooking = async () => {
      const { data } = await listBooking(userData, id);
      setListBookings(data.data);
    };
    getListBooking();
  }, []);


  const onHandleRemove = async (id: any) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?")
    if (confirm) {
      setLoading(true)
      await deleteBooking(id, userData)
        .then((result: any) => {
          setListBookings(listBookings.filter((item: { _id: any; }) => item._id !== id))
          setLoading(false)
          Toast('success', 'Xóa thành công');
        })
        .catch((err) => {
          setLoading(false)
          Toast('error', err?.response?.data?.massage);
        });
    }

  };


  useEffect(() => {
    const getListRoom = async () => {
      const { data } = await listRoom(id, userData);
      setListRooms(data.data);
    };
    getListRoom();
  }, []);


  const onSubmit = async (data1: any) => {
    try {
      const { data } = await createBooking(data1, userData, id);
      const daata = data.data

      setListBookings([...listBookings, daata])
      setOpen(false)
      Toast('success', 'Đặt tiền cọc thành công');

    } catch (error: any) {
      Toast('error', error?.response?.data?.massage);
    }
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Đặt cọc
              </h2>
            </div>
            <div className='text-right'>
              <button
                onClick={onOpenModal}
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              >
                Đặt cọc
              </button>
            </div>
          </div>
        </div>
      </header>
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
                        Tiền cọc
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Ngày nhận phòng
                      </th>
                    </tr>
                  </thead>
                  <tbody className=' ' >
                    {listBookings && listBookings.length > 0 ? (
                      listBookings?.map((item: any, index: number) => {
                        return (
                          <>
                            {item.expectTime == date ? (
                              <tr className=" border-yellow-500 border-2">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
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
                                  {item.bookMoney}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.expectTime}
                                </td>
                                <td className="flex pt-2">
                                  <div>
                                    {/* --------------------- */}
                                    <AddBooking item1={item._id} item2={item.idRoom}></AddBooking>
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

                                
                          ) : (

                        
                          <tr className="border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
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
                              {item.bookMoney}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.expectTime}
                            </td>
                            <td className="flex pt-2">
                              <div>
                                {/* --------------------- */}
                                <AddBooking item1={item._id} item2={item.idRoom}></AddBooking>
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

                               
                            )}
                        </>

                      );
                      })
                      ) : (
                      <div className='text-red-500 p-5'>Không có dữ liệu</div>
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
                      {...register('fullName', { required: true, minLength: 3 })}

                    />
                    <p className='text-red-500'>{errors.fullName?.type === "required" && <span>Không được đểtrống </span>}</p>
                    <p className='text-red-500'>{errors.fullName?.type === "minLength" && <span>Tối thiểu 3 ký tự </span>}</p>
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
                      {...register('idRoom')}
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
                    <p className='text-red-500'>{errors.email?.type === "required" && <span>Không được đểtrống </span>}</p>
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
                      type="number"
                      {...register('phoneNumber', { required: true, minLength: 10 })}
                    />
                    <p className='text-red-500'>{errors.phoneNumber?.type === "required" && <span>Không được đểtrống </span>}</p>
                    <p className='text-red-500'>{errors.phoneNumber?.type === "minLength" && <span>Tối thiểu 10 ký tự </span>}</p>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/5">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      CMT/CCCD
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="number"
                      {...register('cardNumber')}
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
                    <p className='text-red-500'>{errors.bookMoney?.type === "required" && <span>Không được đểtrống </span>}</p>
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
                    <p className='text-red-500'>{errors.expectTime?.type === "required" && <span>Không được đểtrống </span>}</p>

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
        </Modal>
      </div>
    </div>
  );
};

export default Booking;

import { useUserContext } from '@/context/UserContext';
import { async } from '@firebase/util';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import { addReport, listReport, updateReport } from 'src/pages/api/notification';
import UpdateReport from './update';
import { Toast } from 'src/hooks/toast';

type Props = {
  data1: any;
};

const Report = ({ data1 }: Props) => {
  const { cookies, setLoading } = useUserContext();
  const [rooms, setRooms] = useState([]);
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;
  const { id } = router.query;
  const [repost, setReport] = useState<any>();
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  // -------------------GET  repost------------------

  useEffect(() => {
    setLoading(true);
    if (id) {
      const getReport = async () => {
        const { data } = await listReport(data1._id);
        setReport(data.data);
        setLoading(false);
      };
      getReport();
    }
  }, []);
  // ------------------- AND GET  repost------------------

  // -------------------Add  repost------------------
  const onSubmit = async (data2: any) => {
    setLoading(true);
    const newDataa = { ...data2, userData };
    await addReport(newDataa)
      .then((result: any) => {
        console.log('bien lơn', result);
        setLoading(false);
        setReport([...repost, result.data.data]);
        setOpen(false);
        Toast('success', result?.data?.message);
      })
      .catch((err) => {
        Toast('error', err?.data?.message);
        setLoading(false);
      });
  };
  // -------------------End   repost------------------

  // -------------------Upadet t repost------------------
  const onHandleUpdate = async (report: any) => {
    
    setLoading(true);
    await updateReport(report)
      .then((result: any) => {    
        console.log(result.data.data);
        const data = result.data.data._id
                    
        setLoading(false);
        Toast('success', 'Update thành công');
        router.push(`/manager/landlord/${param.id}/list-room`);

        // setReport(repost.map((item: { _id: any; }) => item._id === data ? report : item))
        
      })
      .catch((err) => {
        setLoading(false);
        Toast('error', err?.response?.data?.message);
      });

    // onOpen()
  };
  // ------------------- End Upadet  repost------------------

  return (
    <div>
      <div>
        <div className="text-right">
          <button
            onClick={onOpenModal}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          >
            Thông báo
          </button>
        </div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="w-full">
            <div className="  ">
              <h2 className="pt-2 text-xl">Thông báo </h2>
            </div>{' '}
            <div className="border  p-2">
              <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
                <div className="md:flex md:items-center mb-6 mt-3">
                  <div className="md:w-1/5">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Phòng
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      placeholder="Xin mời nhập tên phòng"
                      defaultValue={data1.name}
                      {...register('roomName', { required: true, minLength: 3 })}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.fullName?.type === 'required' && <span>Không được để trống </span>}
                    </p>
                    <p className="text-red-500 text-sm">
                      {errors.fullName?.type === 'minLength' && <span>Tối thiểu 3 ký tự </span>}
                    </p>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/5">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Nội dung
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      placeholder="Xin mời nhập họ và tên"
                      {...register('content', { required: true, minLength: 3 })}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.fullName?.type === 'required' && <span>Không được để trống </span>}
                    </p>
                    <p className="text-red-500 text-sm">
                      {errors.fullName?.type === 'minLength' && <span>Tối thiểu 3 ký tự </span>}
                    </p>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                  <div className="hidden">
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
                <div className="md:flex md:items-center  ">
                  <div className="hidden">
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-password"
                        type="text"
                        value={data1._id}
                        {...register('idRoom', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <div className=" text-center">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Thêm thông báo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      STT
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Phòng
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Nội dung
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Ngày thông báo
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Tình Trạng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {repost &&
                    repost?.map((item: any, index: number) => {
                      return (
                        <>
                          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {index + 1}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                              {item?.roomName}
                            </td>
                            <td className="  py-4 px-6 text-sm font-medium text-gray-900  dark:text-white">
                              {item?.content}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item?.createdAt}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item?.status == true ? (
                                <div
                                  className="flex p-2 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                  role="alert"
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <svg
                                      className="w-6 h-6 dark:text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </svg>
                                  <span className="sr-only">Info</span>
                                  <div>
                                    <span className="font-medium">Đã sử lý</span>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="flex p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                  role="alert"
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="sr-only">Info</span>
                                  <div>
                                    <span className="font-medium">Chưa sử lý !</span>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <UpdateReport id={item._id} onUpdate={onHandleUpdate}></UpdateReport>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

import { useUserContext } from '@/context/UserContext';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import { updateReport } from 'src/pages/api/notification';

type Props = {
  id: any;

  onUpdate: (props: any) => void;
};

const UpdateReport = (props: Props) => {
  const _id = props.id;
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const [open1, setOpen1] = useState(false);
  const onCloseModal1 = () => setOpen1(false);
  const onOpenModal1 = () => setOpen1(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const onSubmitOne = async (newdata: any) => {
    const newData = { ...newdata, _id, userData };
    props.onUpdate(newData);
    setOpen1(false);
  };
  return (
    <div>
      <button
        onClick={onOpenModal1}
        type="button"
        className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
      >
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease" />
        <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">Cập nhật</span>
      </button>
      <Modal open={open1} onClose={onCloseModal1} center>
        <div className="w-full">
          <hr />
          <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500">
            <div className="">
              <h2 className="pt-2 text-xl">Thông tin </h2>
            </div>
          </div>{' '}
          <div className="border mt-5 p-2">
            <form className="w-full " onSubmit={handleSubmit(onSubmitOne)}>
              <div className=" md:items-center mb-6">
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    {...register('status')}
                  >
                    <option value="false"> Chưa xử lý</option>
                    <option value="true"> Đã xử lý</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className=" text-center">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateReport;

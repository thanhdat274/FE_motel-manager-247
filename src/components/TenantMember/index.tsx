import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useForm } from 'react-hook-form';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { Toast } from 'src/hooks/toast';
import { IMember, IMember2 } from '@/components/ListMember';
import { addPeople } from 'src/pages/api/room';

const ListMember = dynamic(() => import('@/components/ListMember'), { ssr: false });

type IProps = {
  data: IMember2;
  data1: any;
  handleResetPage: () => void
};

const TenantMember = ({ data, data1, handleResetPage }: IProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const param = router.query;
  const { cookies, setLoading, user } = useUserContext();
  const userData = cookies?.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onSubmit = async (listMember: any) => {
    setLoading(true);
    const newData = { ...{ listMember }, userData: userData };

    await addPeople(param.id_room, newData).then((result) => {
      setLoading(false);
      setOpen(false);
      Toast('success', result.data.message);
    }).catch((err) => {
      setLoading(false);
      Toast('error', err.message);
    }).finally(() => {
      handleResetPage()
    });
  };

  return (
    <div>
      <div>
        {data?.status == true ? (
          <div>
            {' '}
            {data1.length < data.maxMember ? (
              <button
                onClick={onOpenModal}
                className="block mb-5 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Thêm thành viên
              </button>
            ) : (
              <>
                <button disabled className="block mb-5 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Đủ người</button>
              </>
            )}
          </div>
        ) : (
          <div>Phòng chưa sẵn sàng</div>
        )}

        <Modal open={open} onClose={onCloseModal} center>
          <div className="w-full pt-6">
            <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 mt-4 ">
              <div className="">
                <h2 className="pt-2 text-xl text-white">Thêm thành viên </h2>
              </div>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Tên thành viên <span className="text-[red]">*</span>
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Xin mời nhập tên thành viên"
                  {...register('memberName', { required: true, minLength: 6 })}
                />
                {errors.memberName?.type === 'required' && (
                  <span className="text-[red] mt-1 block">Vui lòng nhập tên thành viên!</span>
                )}
                {errors.memberName?.type === 'minLength' && (
                  <span className="text-[red] mt-1 block">Tên thành viên tối thiểu 6 ký tự!</span>
                )}
              </div>

              <div className="col-span-6">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                  Chức vụ <span className="text-[red]">*</span>
                </label>
                {data1?.length < 1 ? (
                  <select
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register('status', { required: true })}
                    id="status"
                  >
                    <option value="true">Người đại diện</option>
                  </select>
                ) : (
                  <select
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register('status', { required: true })}
                    id="status"
                  >
                    <option value="false">Thành viên</option>
                  </select>
                )}
              </div>
              <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  CMND/CCCD <span className="text-[red]">*</span>
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cardNumber"
                  type="text"
                  placeholder="Xin mời nhập  CMND/CCCD"
                  {...register('cardNumber', {
                    required: true,
                    minLength: 9,
                    maxLength: 12,
                    pattern: /^[0-9]+$/
                  })}
                />
                {errors.cardNumber?.type === 'required' && (
                  <span className="text-[red] mt-1 block">Vui lòng nhập số CMND/CCCD!</span>
                )}
                {errors.cardNumber?.type === 'minLength' && (
                  <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
                )}
                {errors.cardNumber?.type === 'maxLength' && (
                  <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
                )}
                {errors.cardNumber?.type === 'pattern' && (
                  <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Số điện thoại <span className="text-[red]">*</span>
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  type="text"
                  placeholder="Xin mời nhập số điện thoại"
                  {...register('phoneNumber', {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
                  })}
                />
                {errors.phoneNumber?.type === 'required' && (
                  <span className="text-[red] mt-1 block">Vui lòng nhập số điện thoại!</span>
                )}
                {errors.phoneNumber?.type === 'minLength' && (
                  <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                )}
                {errors.phoneNumber?.type === 'maxLength' && (
                  <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                )}
                {errors.phoneNumber?.type === 'pattern' && (
                  <span className="text-[red] mt-1 block">Số điện thoại không đúng định dạng!</span>
                )}
              </div>

              <div className="flex items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Thêm thành viên
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      {data.status == true ? (
        <div className="flex flex-row flex-wrap w-full gap-4">
          {data1.length > 0 ? (
            data1?.map((item: IMember) => (
              <div key={item.memberName} className=" basis-full md:basis-[30%] ">
                <ListMember {...item} handleResetPage={() => handleResetPage()} />
              </div>
            ))
          ) : (
            <div>Chưa có thành viên nào</div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TenantMember;

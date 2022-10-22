import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Toast } from 'src/hooks/toast';
import { style } from '@mui/system';
import TenantContract from '../TenantContact';
import { IMember, IMember2 } from '@/components/ListMember';

const ListMember = dynamic(() => import('@/components/ListMember'), { ssr: false });

type IProps = {
  data: IMember2;
  data1:any;
};


const TenantMember = ({ data, data1 }: IProps) => {
  console.log(data);
  
  const [open, setOpen] = useState(false);
  const { setLoading } = useUserContext();
  const router = useRouter();
  const param = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      await axios
        .post(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/${param.id_room}/people`, data)
        .then((data: any) => {
          setLoading(false);
          router.push(`/manager/landlord/${param.id}/list-room`);
          Toast('success', 'Thêm mới thành viên thành công');
        });
    } catch (error) {
      setLoading(false);
      Toast('error', 'Thêm mới phòng thành viên thành công');
    }
  };

  return (
    <div>
      <div>
        {' '}
        {data1.length < data.maxMember ? (
          <button onClick={onOpenModal} className="p-3 border mb-3 bg-cyan-400 text-white hover:bg-cyan-500">
            Thêm thành viên
          </button>
        ) : (
          <>
            <button className='border mb-5 px-3 py-2  bg-cyan-400 text-white  disabled:opacity-50' >Đủ người</button>
          </>
        )}
        <Modal open={open} onClose={onCloseModal} center>
          <div className="w-full">
            <h1 className="pt-2">
              -----------------------------------------------------------------------------------------------------------------------
            </h1>
            <hr />
            <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
              <div className="">
                <h2 className="pt-2 text-xl">Thêm thành viên </h2>
              </div>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Tên thành viên
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Xin mời nhập tên thành viên"
                  {...register('full_name', { required: true, minLength: 6 })}
                />
                {errors.full_name?.type === 'required' && (
                  <span className="text-rose-600">Mời bạn nhập tên thành viên</span>
                )}
                {errors.full_name?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
              </div>

              <div className="col-span-6">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                  Trạng thái phòng
                </label>
                <select
                  className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register('role', { required: true })}
                  id="role"
                >
                  <option value="1">Chủ phòng</option>
                  <option value="0">Thành viên</option>
                </select>
              </div>
              <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  CMT/CCCD
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cccd"
                  type="text"
                  placeholder="Xin mời nhập  CMT/CCCD"
                  {...register('cccd', { required: true, minLength: 6 })}
                />
                {errors.cccd?.type === 'required' && <span className="text-rose-600">Mời bạn nhập CMT/CCCD</span>}
                {errors.cccd?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Số điện thoại
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Xin mời nhập  sô điện thoại"
                  {...register('phone', { required: true, minLength: 6, maxLength: 11 })}
                />
                {errors.phone?.type === 'required' && <span className="text-rose-600">Mời bạn nhập CMT/CCCD</span>}
                {errors.phone?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
                {errors.phone?.type === 'maxLength' && <span className="text-rose-600">Tối thiểu 11 ký tự</span>}
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
      <div className="flex flex-row flex-wrap w-full gap-4">
        {data1.length > 0 ? (
          data1?.map((item: IMember) => (
            <div key={item.memberName} className=" basis-full md:basis-[30%] ">
              <ListMember {...item} />
            </div>
          ))
        ) : (
          <div>Chưa có thành viên nào</div>
        )}
      </div>
    </div>
  );
};

export default TenantMember;

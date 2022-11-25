import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { addHouse } from 'src/pages/api/house';
type Props = {};

type FormInput = {
  _id: string;
  name: string;
  address: string;
};

const AddHome = (props: Props) => {
  const router = useRouter();
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (dataForm: any) => {
    const newData = { ...dataForm, userData: userData };
    setLoading(true);
    await addHouse(newData)
      .then(() => {
        setLoading(false);
        Toast('success', 'Thêm nhà  thành công!');
        router.push('/manager/landlord/list-home');
      })
      .catch((error) => {
        Toast('error', error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full ">
      <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
        <div className="">
          <h2 className="pt-2 text-xl">Thêm nhà</h2>
        </div>
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Tên nhà <span className="text-[red]">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Xin mời nhập tên nhà"
            {...register('name', { required: true, minLength: 6 })}
          />
          {errors.name?.type === 'required' && (
            <span className="text-[red] mt-1 block">Vui lòng nhập tên nhà của bạn!</span>
          )}
          {errors.name?.type === 'minLength' && (
            <span className="text-[red] mt-1 block">Tên nhà của bạn phải tối thiểu 6 ký tự!</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Địa chỉ <span className="text-[red]">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Xin mời nhập địa chỉ"
            {...register('address', { required: true, minLength: 6 })}
          />
          {errors.address?.type === 'required' && (
            <span className="text-[red] mt-1 block">Vui lòng nhập địa chỉ nhà của bạn!</span>
          )}
          {errors.address?.type === 'minLength' && (
            <span className="text-[red] mt-1 block">Địa chỉ nhà của bạn phải tối thiểu 6 ký tự!</span>
          )}
        </div>

        <div className="flex items-center gap-6">
          <Link
            href={`/manager/landlord/list-home`}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <a className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Quay lại
            </a>
          </Link>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Thêm nhà
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHome;

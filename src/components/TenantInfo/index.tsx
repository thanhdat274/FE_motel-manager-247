import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { updateRoom } from 'src/pages/api/room';

type IForm = {
  name: string;
  price: number;
  status: boolean;
  max: number;
  email:string;
};
type Props = {
  data: IForm | any;
};

const TenantInformation = ({ data }: any) => {
  const { name, price, status, max, area,email } = data;
  const router = useRouter();
  const param = router.query;
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      status: status,
      maxMember: max,
      price: price,
      area: area,
      email:email,
    },
  });
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = async (data: any) => {
    const newData = { ...data };
    setLoading(true);
    await updateRoom(param?.id_room, userData?.token, newData)
      .then((result) => {
        setLoading(false);
        router.push(`/manager/landlord/${param.id}/list-room`);
        Toast('success', 'Cập nhật phòng thành công');
      })
      .catch((error) => {
        Toast('error', error?.response?.data?.error);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-full mx-auto py-6 ">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-3 border rounded-md">
          <form id="formAdd" onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow rounded-md overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="col-span-6">
                  <label className="block text-sm font-bold text-gray-700" htmlFor="username">
                    Tên phòng <span className="text-[red]">*</span>
                  </label>
                  <input
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    {...register('name', { required: true, minLength: 6 })}
                  />
                  {errors.name?.type === 'required' && (
                    <span className="text-[red] mt-1 block">Không dược để trống!</span>
                  )}
                  {errors.name?.type === 'minLength' && (
                    <span className="text-[red] mt-1 block">Tối thiểu 6 ký tự</span>
                  )}
                </div>

                <div className="col-span-6">
                  <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                    Trạng thái phòng
                  </label>
                  <select
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register('status', { required: true })}
                    id="status"
                  >
                    <option value="true">Sẵn sàng</option>
                    <option value="false">Chưa sẵn sàng</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                    Giá phòng <span className="text-[red]">*</span>
                  </label>
                  <input
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    {...register('price', { required: true, min: 1000 })}
                  />
                  {errors.price && errors.price.type === 'required' && (
                    <span className="text-[red] mt-1 block">Không dược để trống!</span>
                  )}
                </div>
                <div className="col-span-6">
                  <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                    Email người đại diện <span className="text-[red]">*</span>
                  </label>
                  <input
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    {...register('email', { required: true, min: 1000 })}
                  />
                  {errors.price && errors.price.type === 'required' && (
                    <span className="text-[red] mt-1 block">Không dược để trống!</span>
                  )}
                </div>

                <div className="col-span-6">
                  <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                    Số người ở tối đa <span className="text-[red]">*</span>
                  </label>
                  <input
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="max"
                    type="number"
                    {...register('maxMember', { required: true })}
                  />
                  {errors.maxMember && errors.maxMember.type === 'required' && (
                    <span className="text-[red] mt-1 block">Không dược để trống!</span>
                  )}
                </div>

                <div className="col-span-6">
                  <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                    Diện tích <span className="text-[red]">*</span>
                  </label>
                  <input
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="area"
                    type="number"
                    {...register('area', { required: true })}
                  />
                  {errors.area && errors.area.type === 'required' && (
                    <span className="text-[red] mt-1 block">Không dược để trống!</span>
                  )}
                </div>
              </div>

              <div className="px-4 py-3 flex gap-[20px] bg-gray-50 text-right sm:px-6 ">
                <Link
                  href={`/manager/landlord/${param.id}/list-room`}
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
                  Lưu
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TenantInformation;

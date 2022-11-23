import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Toast } from 'src/hooks/toast';
import { addRoom } from 'src/pages/api/room';
type Props = {};

type FromValues = {
  _id: string;
  name: string;
  price: string;
  area: number;
  maxMember: number;
  status: string;
  idHouse: string;
  idAuth: string;
};

const AddRoom = (props: Props) => {
  const { cookies, setLoading, user } = useUserContext();
  const userData = cookies?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue
  } = useForm<FromValues>();
  const router = useRouter();
  const { id } = router.query;

  const onSubmit: SubmitHandler<FromValues> = async (data: any) => {
    const newData = { ...data, price: Number(data.price.replace(/[^0-9\.]+/g, "")), userData: userData, idHouse: id, idAuth: userData?.user?._id };
    setLoading(true);
    await addRoom(newData)
      .then((data: any) => {
        setLoading(false);
        Toast('success', 'Thêm mới phòng thành công');
        router.push(`/manager/landlord/${id}/list-room`);
      })
      .catch((error) => {
        Toast('error', error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full">
      <header className="bg-white shadow border rounded-md">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Thêm mới phòng
              </h2>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-full mx-auto py-6">
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
                        <span className="text-[red] mt-1 block">Vui lòng nhập tên phòng của bạn!</span>
                      )}
                      {errors.name?.type === 'minLength' && (
                        <span className="text-[red] mt-1 block">Tên phòng của bạn phải tối thiểu 6 ký tự!</span>
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
                        <option value="false">Phòng đang sửa chữa</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                        Giá phòng <span className="text-[red]">*</span>
                      </label>
                      <NumericFormat className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" thousandSeparator=","
                        {...register('price', {
                          required: true,
                          validate: value => value > '0'
                        })} />
                      {errors.price?.type === 'required' && (
                        <span className="text-[red] mt-1 block">Vui lòng nhập giá phòng của bạn!</span>
                      )}
                      {errors.price?.type === 'validate' && (
                        <span className="text-[red] mt-1 block">Giá phòng không nhỏ hớn 1000 VNĐ</span>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                        Số người ở tối đa <span className="text-[red]">*</span>
                      </label>
                      <input
                        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="maxMember"
                        type="number"
                        {...register('maxMember', { required: true, min: 0 })}
                      />
                      {errors.maxMember?.type === 'required' && (
                        <span className="text-[red] mt-1 block">Vui lòng nhập số người ở tối đa của phòng!</span>
                      )}
                      {errors.maxMember && errors.maxMember.type === 'min' && (
                        <span className="text-[red] mt-1 block">Số người ở tối đa của phòng Không được nhỏ hơn 0!</span>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                        Diện tích (m2) <span className="text-[red]">*</span>
                      </label>
                      <input
                        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="area"
                        type="number"
                        {...register('area', { required: true, min: 0 })}
                      />
                      {errors.area && errors.area.type === 'required' && (
                        <span className="text-[red] mt-1 block">Vui lòng nhập diện tích phòng của bạn!</span>
                      )}
                      {errors.area && errors.area.type === 'min' && (
                        <span className="text-[red] mt-1 block">Diện tích phòng của bạn không được nhỏ hơn 0m2!</span>
                      )}
                    </div>
                  </div>

                  <div className="px-4 py-3 flex gap-[20px] bg-gray-50 text-right sm:px-6 ">
                    <Link
                      href={`/manager/landlord/${id}/list-room`}
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
      </main>
    </div>
  );
};

export default AddRoom;

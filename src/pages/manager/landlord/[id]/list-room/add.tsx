import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { supabase } from 'src/apis/supabase';
import { addHouse } from 'src/pages/api/house';
import swal from 'sweetalert';
type Props = {};

type FromValues = {
  name: string;
  price: number;
  room_size: number;
  people: number;
  desc: string;
  homeId: string;
};

const AddRoom = (props: Props) => {
  const [houses, setHouse] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (dataForm: any) => {
    console.log('data', dataForm);
    try {
      await supabase.from('list-room').insert([dataForm]);
      swal('Bạn đã thêm thành công! Chuyển trang sau 2s', {
        icon: 'success',
      });
      setTimeout(() => {
        router.push(`/manager/landlord/${id}/list-room`);
      }, 2000);
    } catch (error) {
      swal('Đã xảy ra lỗi!', {
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                  thêm mới phòng
                </h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-full mx-auto py-6 ">
            <div className="md:grid md:grid-cols-3 md:gap-6 ">
              <div className="mt-5 md:mt-0 md:col-span-3 border">
                <form id="formAdd" onSubmit={handleSubmit(onSubmit)}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Danh sách nhà <span className="text-[red]">*</span>
                        </label>
                        <select
                          id="homeId"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                          {...register('homeId')}
                        >
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="11">11</option>
                        </select>
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Phòng số <span className="text-[red]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                          {...register('name', { required: true })}
                        />
                        {errors.name && errors.name.type === 'required' && (
                          <span style={{ color: 'red' }}>Không dược để trống!</span>
                        )}
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Giá <span className="text-[red]">*</span>
                        </label>
                        <input
                          type="number"
                          id="price"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                          {...register('price', { required: true })}
                        />
                        {errors.price && errors.price.type === 'required' && (
                          <span style={{ color: 'red' }}>Không dược để trống!</span>
                        )}
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Diện tích phòng (m2) <span className="text-[red]">*</span>
                        </label>
                        <input
                          type="number"
                          id="quantity-product"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                          {...register('room_size', { required: true })}
                        />
                        {errors.room_size && errors.room_size.type === 'required' && (
                          <span style={{ color: 'red' }}>Không dược để trống!</span>
                        )}
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Số lượng người thuê tối đa<span className="text-[red]">*</span>
                        </label>
                        <input
                          type="number"
                          id="quantity-product"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                          {...register('people', { required: true })}
                        />
                        {errors.people && errors.people.type === 'required' && (
                          <span style={{ color: 'red' }}>Không dược để trống!</span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mô tả <span className="text-[red]">*</span>
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={5}
                            id="desc-product"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md outline-0 pl-[10px]"
                            defaultValue={''}
                            {...register('desc', { required: true })}
                          />
                          {errors.desc && errors.desc.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>
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
    </div>
  );
};

export default AddRoom;

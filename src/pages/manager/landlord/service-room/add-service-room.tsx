import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Props = {};
interface IFormInputs {
  name: string;
  price: number;
  desc: string;
}
const AddServiceRoom = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/service/', data);
      alert('Bạn đã thêm thành công!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                  Thêm mới dịch vụ
                </h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-3 md:gap-6 ">
              <div className="mt-5 md:mt-0 md:col-span-3 border">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Tên dịch vụ <span className="text-[red]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name-product"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md"
                          {...register('name', { required: true })}
                        />
                        <span className="text-red-500">{errors.name && 'Không được bỏ trống!'}</span>
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Giá <span className="text-[red]">*</span>
                        </label>
                        <input
                          type="number"
                          id="price-product"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md"
                          {...register('price', { required: true })}
                        />
                        <span className="text-red-500">{errors.price && 'Không được bỏ trống!'}</span>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ghi chú <span className="text-[red]">*</span>
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={5}
                            id="short_desc-product"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            defaultValue={''}
                            {...register('desc', { required: true })}
                          />
                          <span className="text-red-500">{errors.price && 'Không được bỏ trống!'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <a
                        href="/admin/product"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Hủy
                      </a>
                      <button type='submit' className="inline-flex justify-center py-2 px-4 m-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Thêm mới
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

export default AddServiceRoom;

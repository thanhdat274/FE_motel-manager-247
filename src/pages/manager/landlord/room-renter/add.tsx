import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
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

const Add = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FromValues>();
  const router = useRouter();
  const onSubmit: SubmitHandler<FromValues> = async (data) => {
    try {
      await axios.post('http://localhost:3001/room', data);
      swal('Bạn đã thêm thành công! Chuyển trang sau 2s', {
        icon: 'success',
      });
      setTimeout(() => {
        router.push('/manager/landlord/room-list');
      }, 2000);
    } catch (error) {
      console.log(error);
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
                  thêm mới người thuê phòng
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
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Họ và tên <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            CMND/ CCCD <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Giới tính <span className="text-[red]">*</span>
                          </label>
                          <div className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 flex gap-4 items-center pl-[20px]">
                            <div className="flex items-center">
                              <input
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                checked
                              />
                              <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                Nam
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="push-email"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                Nữ
                              </label>
                            </div>
                          </div>

                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Ngày cấp <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Điện thoại 1 <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">Nơi cấp</label>
                          <select
                            id="homeId"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md pl-[10px]"
                            {...register('homeId')}
                          >
                            <option value="0">Tỉnh/Thành phố</option>
                            <option value="1">CỤC TRƯỞNG CỤC CẢNH SÁT ĐKQL CƯ TRÚ VÀ DLQG VỀ DÂN CƯ</option>
                            <option value="2">CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI</option>
                            <option value="3">Hà Nội</option>
                            <option value="">Hồ Chí Minh</option>
                            <option value="">Thành phố Cần Thơ</option>
                            <option value="">Thành phố Đà Nẵng</option>
                            <option value="">Thành phố Hải Phòng</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Danh sách nhà <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Danh sách nhà <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Danh sách nhà <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Danh sách nhà <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Danh sách nhà <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm h-[30px] border border-gray-300 rounded-md outline-0 pl-[10px]"
                            {...register('name', { required: true, minLength: 5 })}
                          />
                          {errors.name && errors.name.type === 'required' && (
                            <span style={{ color: 'red' }}>Không dược để trống!</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex gap-[20px] bg-gray-50 text-right sm:px-6 ">
                      <Link
                        href="/manager/landlord/room-list"
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

export default Add;

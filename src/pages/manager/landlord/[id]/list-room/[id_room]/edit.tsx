import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';

type Props = {};

type FromValues = {
  id: string;
  name: string;
  price: number;
  area: number;
  max: number;
  status: boolean;
  houseId: string;
};

const EditRoom = (props: Props) => {
  const { setLoading } = useUserContext();
  const [showMsg, setShowMsg] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FromValues>();
  const router = useRouter();
  const param = router.query;
  // const { id } = router.query;
  console.log(param);
  

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get(
          `https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/` + `${param.id_room}`,
        );
        if (res.data) {
          reset(res.data as any);
          console.log('data', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, [param.id, param.id_room]);

  const onSubmit: SubmitHandler<FromValues> = async (data) => {
    console.log('data từ form', data);
    setLoading(true);
    try {
      await axios
        .put(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/` + `${param.id_room}`, data)
        .then((data: any) => {
          setLoading(false);
          setShowMsg(true);
          router.push(`/manager/landlord/${param.id}/list-room`);
          Toast('success', 'Cập nhật phòng thành công');
        });
    } catch (error) {
      Toast('error', 'Cập nhật phòng không thành công');
    }
  };

  return (
    <div className="w-full">
      <header className="bg-white shadow border rounded-md">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Cập nhật phòng
              </h2>
            </div>
          </div>
        </div>
      </header>

      <main>
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
                        id="status"
                        {...register('status', { required: true })}
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
                        {...register('price', { required: true })}
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
                        {...register('max', { required: true })}
                      />
                      {errors.max && errors.max.type === 'required' && (
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
      </main>
    </div>
  );
};

export default EditRoom;

import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Toast } from 'src/hooks/toast';
import { updateRoom } from 'src/pages/api/room';

type IForm = {
  name: string;
  price: number;
  status: boolean;
  maxMember: number;
  emailOfAuth: string;
  area: number
};
type Props = {
  data: IForm | any;
};

const TenantInformation = ({ data }: any) => {
  const router = useRouter();
  const param = router.query;
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IForm>({});
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = async (data: any) => {
    const newData = { ...data, price: Number(data.price), idRoom: param?.id_room, token: userData?.token };
    setLoading(true);
    await updateRoom(newData)
      .then((result) => {
        setLoading(false);
        Toast('success', 'Cập nhật phòng thành công');
        router.push(`/manager/landlord/${param.id}/list-room`);
      })
      .catch((error) => {
        Toast('error', error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-full mx-auto">
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
                  <NumericFormat
                    value={String(data?.price)}
                    thousandSeparator=","
                    type="text"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register('price', {
                      required: true,
                    })}
                    onChange={(e) => {
                      setValue('price', Number(e.target.value.split(',').join('')))
                    }}
                  />
                  {errors.price?.type === 'required' && (
                    <span className="text-[red] mt-1 block">Vui lòng nhập giá phòng của bạn!</span>
                  )}
                </div>
                <div className="col-span-6">
                  <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                    Email người đại diện <span className="text-[red]">*</span>
                  </label>
                  <input
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="emailOfAuth"
                    type="emailOfAuth"
                    {...register('emailOfAuth', {
                      required: false,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                  />
                  {errors.emailOfAuth?.type === 'required' && (
                    <span className="text-[red] mt-1 block">Vui lòng nhập địa chỉ email của bạn!</span>
                  )}
                  {errors.emailOfAuth?.type === 'pattern' && (
                    <span className="text-[red] mt-1 block">Địa chỉ email của bạn không đúng định dạng!</span>
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

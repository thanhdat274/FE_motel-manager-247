import { useUserContext } from '@/context/UserContext';
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateUserInfo, UserInfo } from 'src/pages/api/auth';
import { Toast } from 'src/hooks/toast';

type Props = {};

type FormInputs = {
  _id: string;
  name: string;
  cardNumber: string;
  dateRange: string;
  issuedBy: string;
  address: string;
  phoneNumber: string;
};

const AccountInformation = (props: Props) => {
  const { cookies, setLoading, setCookie } = useUserContext();
  const userData = cookies?.user;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const { data } = await UserInfo(userData as any);
        reset(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getUsers();
  }, [reset, setLoading, userData]);

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const newData = { ...data, userData: userData };
    const newCookie = { ...userData, user: data };
    setLoading(true);
    await UpdateUserInfo(newData)
      .then((newData: any) => {
        Toast('success', 'Cập nhật tài khoản thành công');
        setCookie('user', JSON.stringify(newCookie), { path: '/', maxAge: 30 * 24 * 60 * 60 });
        setLoading(false);
        console.log(userData);
      })
      .catch((error) => {
        Toast('error', error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Thông tin tài khoản</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Họ và tên <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập họ và tên"
                {...register('name', { required: true })}
              />
              {errors.name?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập họ và tên!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block">
                CMND/CCCD <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập CCCD"
                {...register('cardNumber', {
                  required: true, minLength: 9, maxLength: 12, pattern: /^[0-9]+$/
                })}
              />
              {errors.cardNumber?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập số CMND/CCCD!</span>
              )}
              {errors.cardNumber?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng định dạng!</span>
              )}
              {errors.cardNumber?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
              )}
              {errors.cardNumber?.type === 'pattern' && (
                <span className="text-[red] mt-1 block">Số CMND/CCCD không đúng dịnh dạng!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block">
                Ngày cấp <span className="text-[red]">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                {...register('dateRange', { required: true })}
              />
              {errors.dateRange?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng chọn ngày cấp!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block">
                Nơi cấp <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập nơi cấp...."
                {...register('issuedBy', { required: true })}
              />
              {errors.issuedBy?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập nơi cấp!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block">
                Số điện thoại <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập số điện thoại....."
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
            <div className="mt-4">
              <label className="block">
                Địa chỉ <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập địa chỉ....."
                {...register('address', { required: true })}
              />
              {errors.address?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập địa chỉ!</span>
              )}
            </div>
            <div className="flex mt-[20px]">
              <button
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;

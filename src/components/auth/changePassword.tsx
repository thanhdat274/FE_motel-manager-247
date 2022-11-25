import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { changePassword } from 'src/pages/api/auth';

type Props = {}
type FormInputs = {
  email: string;
  oldPassword: string;
  newPassword: string;
  verifyPassword: string;
};

const ChangePassword = (props: Props) => {
  const { setLoading, cookies } = useUserContext();
  const router = useRouter();
  const userData = cookies?.user;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setLoading(true);
    const newData = { ...data, email: userData?.user?.email };
    if (data.newPassword === data.verifyPassword) {
      await changePassword(newData)
        .then((data: any) => {
          setLoading(false);
          Toast('success', 'Thay đổi mật khẩu thành công, chuyển trang sau 2s!');
          setTimeout(() => {
            router.push('/');
          }, 2000);
        })
        .catch((error) => {
          Toast('error', error?.response?.data?.message);
          setLoading(false);
        });
    } else {
      Toast('error', 'Mật khẩu mới không trùng khớp vui lòng bạn nhập lại!');
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Đổi mật khẩu</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Mật khẩu cũ <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu cũ"
                {...register('oldPassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.oldPassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập mật khẩu cũ của bạn!</span>
              )}
              {errors.oldPassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu cũ của bạn phải tối thiểu 8 ký tự!</span>
              )}
              {errors.oldPassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu cũ của bạn phải tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Mật khẩu mới<span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu mới"
                {...register('newPassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.newPassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập mật khẩu mới của bạn!</span>
              )}
              {errors.newPassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu mới của bạn phải tối thiểu 8 ký tự!</span>
              )}
              {errors.newPassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu mới của bạn phải tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Nhập lại mật khẩu mới <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập lại mật khẩu mới"
                {...register('verifyPassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.verifyPassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập lại mật khẩu mới của bạn!</span>
              )}
              {errors.verifyPassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu mới của bạn phải tối thiểu 8 ký tự!</span>
              )}
              {errors.verifyPassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu mới của bạn phải tối đa 20 ký tự!</span>
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
  )
}

export default ChangePassword
import { useUserContext } from '@/context/UserContext';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { fogetPassword, resetPassword } from 'src/pages/api/auth';
import { useRouter } from 'next/router';
type Props = {};
type FormInputs = {
  token: string;
  newPassword: string;
  verifyPassword: string;
};
const Resetpassword = (props: Props) => {
  const router = useRouter();
  const param = router.query;

  const { setLoading } = useUserContext();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setLoading(true);
    const newData = { ...data, token: param?.token };
    if (data.newPassword === data.verifyPassword) {
      await resetPassword(newData)
        .then((data: any) => {
          Toast('success', 'Thay đổi mật khẩu thành công, chuyển trang sau 2s!');
          setLoading(false);
          setTimeout(() => {
            router.push('/auth/signin');
          }, 2000);
        })
        .catch((error) => {
          Toast('error', error?.response?.data?.message);
          setLoading(false);
        });
    } else {
      Toast('error', 'Mật khẩu không trùng khớp vui lòng bạn nhập lại!');
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Tạo mật khẩu mới</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Mật khẩu <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu"
                {...register('newPassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.newPassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập mật khẩu!</span>
              )}
              {errors.newPassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối thiểu 8 ký tự!</span>
              )}
              {errors.newPassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Nhập lại mật khẩu <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập lại mật khẩu"
                {...register('verifyPassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.verifyPassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập lại mật khẩu!</span>
              )}
              {errors.verifyPassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối thiểu 8 ký tự!</span>
              )}
              {errors.verifyPassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="flex mt-[20px]">
              <button
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;

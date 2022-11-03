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
  console.log(param.token);

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
    console.log(data);
    const newdata = { ...data, token: param.token };
    await resetPassword(newdata)
      .then((data: any) => {
        console.log('data', data);
        setLoading(false);
        Toast('success', 'Thay đổi mật khẩu thành công, chuyển trang sau 2s!');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      })
      .catch((error) => {
        Toast('error', error?.response?.data?.message);
        console.log();
        setLoading(false);
      });
  };
  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Tạo mật khẩu mới</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu"
                {...register('newPassword', { required: true })}
              />
              {errors.newPassword?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Nhập lại mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập lại mật khẩu"
                {...register('verifyPassword', { required: true })}
              />
              {errors.verifyPassword?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
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

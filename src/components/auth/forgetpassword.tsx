import { useUserContext } from '@/context/UserContext';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { fogetPassword } from 'src/pages/api/auth';

type Props = {};
type FormInputs = {
  email: string;
};
const Forgetpassword = (props: Props) => {
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
    await fogetPassword(data)
      .then((data: any) => {
        Toast('success', 'Vui lòng check Email của bạn !');
        setLoading(false);
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
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Lấy lại mật khẩu</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập email đã đăng kí"
                {...register('email', { required: true })}
              />
              {errors.email?.type === 'required' && <span className="text-rose-600">Không được bỏ trống</span>}
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

export default Forgetpassword;

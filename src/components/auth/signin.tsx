import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { SignIn } from 'src/pages/api/auth';
import { useUserContext } from '../../context/UserContext';

type Props = {};

type FormValues = {
  email: string;
  password: string;
};

const Signin = (props: Props) => {
  const { setLoading, setCookie } = useUserContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    await SignIn(data)
      .then((data) => {
        setLoading(false);
        setCookie('user', JSON.stringify(data.data), { path: '/', maxAge: 30 * 24 * 60 * 60 });
        Toast('success', 'Đăng nhập thành công');
        router.push(`/`);
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
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">đăng nhập</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Địa chỉ email <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập email"
                {...register('email', {
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
              />
              {errors.email?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập địa chỉ email của bạn!</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className="text-[red] mt-1 block">Địa chỉ email của bạn không đúng định dạng!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block">
                Mật khẩu <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu"
                {...register('password', { required: true })}
              />
              {errors.password?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập mật khẩu của bạn!</span>
              )}
            </div>
            <div className="flex items-center justify-end">
              <Link href={`/auth/forget-password`}>
                <a className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
              </Link>
            </div>
            <div className="flex mt-[20px]">
              <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600">
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="mt-6 text-grey-dark">
            Bạn chưa có tài khoản?{' '}
            <Link href={'/auth/signup'}>
              <a className="text-blue-600 hover:underline">Đăng ký tài khoản</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

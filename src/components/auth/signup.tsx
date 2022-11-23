import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserSignup } from 'src/pages/api/auth';
type Props = {};
interface IFormInputs {
  email: string;
  name: string;
  password: string;
  repassword: string;
}

const Signup = (props: Props) => {
  const { setLoading } = useUserContext();
  const [message, setMessage] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setLoading(true);
    if (data.password === data.repassword) {
      await UserSignup(data)
        .then((data) => {
          setLoading(false);
          setMessage(data.data?.message)
        })
        .catch((error) => {
          const msgError = error?.response?.data?.message
          Toast('error', msgError);
          setLoading(false);
        });
    } else {
      Toast('error', 'Mật khẩu không trùng khớp vui lòng bạn nhập lại!');
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {!message && <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">đăng ký</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                <span className="text-[red] mt-1 block">Vui lòng nhập email của bạn!</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className="text-[red] mt-1 block">Email không đúng định dạng</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Họ và tên <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập họ và tên"
                {...register('name', {
                  required: true
                })}
              />
              {errors.name?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập họ và tên của bạn!</span>
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
                {...register('password', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.password?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập mật khẩu của bạn</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu của bạn phải tối thiểu 8 ký tự!</span>
              )}
              {errors.password?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu của bạn phải tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block">
                Nhập lại mật khẩu <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập lại mật khẩu"
                {...register('repassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.repassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập lại mật khẩu của bạn</span>
              )}
              {errors.repassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu của bạn phải tối thiểu 8 ký tự!</span>
              )}
              {errors.repassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu của bạn phải tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="flex mt-[20px]">
              <button
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
              >
                Đăng ký
              </button>
            </div>
          </form>
          <div className="mt-6 text-grey-dark">
            Bạn đã có tài khoản?{' '}
            <Link href={'/auth/signin'}>
              <a className="text-blue-600 hover:underline">Đăng nhập</a>
            </Link>
          </div>
        </div>
      </div>}
      {message && <div className="max-w-2xl w-full space-y-8">
        <div className='w-full flex justify-center flex-col'>
          <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="text-green-500 h-20" />
          <h2 className='text-[25px] mt-10 text-green-500 text-center'>{message}</h2>
          <Link href="https://mail.google.com">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block mt-10">Đi tới email</a>
          </Link>
        </div>
      </div>}
    </div>
  );
};
export default Signup;

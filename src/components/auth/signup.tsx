import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';
import { UserSignup } from 'src/pages/api/auth';
import ReCAPTCHA from 'react-google-recaptcha';
type Props = {};
interface IFormInputs {
  email: string;
  name: string;
  password: string;
}

const Signup = (props: Props) => {
  const { setLoading } = useUserContext();
  const router = useRouter();
  const [captcha, setCaptcha] = useState(false);
  const onChange = (value: any) => {
    setCaptcha(true);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log(data);
    setLoading(true);

    await UserSignup(data)
      .then(() => {
        Toast('success', 'Bạn đã đăng ký thành công , mời bạn đăng nhập!');
        router.push('/auth/signin');
        setLoading(false);
      })
      .catch((error) => {
        const msgError = error.response.data.error;
        Toast('error', msgError);
        setLoading(false);
      });
  };
  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">đăng ký</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Địa chỉ email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập email"
                {...register('email', { required: true })}
              />
              {errors.email && <span style={{ color: 'red' }}>Hãy nhập email của bạn!</span>}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập họ và tên"
                {...register('name', { required: true })}
              />
              {errors.name && <span style={{ color: 'red' }}>Hãy nhập tên của bạn!</span>}
            </div>

            <div className="mt-4">
              <label className="block">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu"
                {...register('password', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.password?.type === 'required' && <span style={{ color: 'red' }}>Hãy nhập mật khẩu của bạn!</span>}
              {errors.password?.type === 'minLength' && (
                <span style={{ color: 'red' }}>Mật khẩu của bạn phải tối thiểu 8 ký tự!</span>
              )}
              {errors.password?.type === 'maxLength' && (
                <span style={{ color: 'red' }}>Mật khẩu của bạn phải tối đa 20 ký tự!</span>
              )}
            </div>
            <ReCAPTCHA sitekey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'} onChange={onChange} />
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
      </div>
    </div>
  );
};
export default Signup;

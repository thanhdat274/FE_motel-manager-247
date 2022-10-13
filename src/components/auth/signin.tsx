import Link from 'next/link';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {};

const Signin = (props: Props) => {
  const [captcha, setCaptcha] = useState(false);
  const onChange = (value: any) => {
    console.log('Captcha value:', value);
    setCaptcha(true);
  };
  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">đăng nhập</h2>
          <form className="space-y-6">
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Địa chỉ email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder='Nhập email'
              />
            </div>
            <div className="mt-4">
              <label className="block">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder='Nhập mật khẩu'
              />
            </div>
            <div className="flex items-center justify-end">
              <Link href={`/forgetPass`}>
                <a className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
              </Link>
            </div>

            <ReCAPTCHA  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChange} />
            
            <div className="flex mt-[20px]">
              <button
                disabled={!captcha}
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
              >
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
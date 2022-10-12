import Link from 'next/link';
import React, { useState } from 'react';
type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">đăng ký</h2>
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
              <label className="block" htmlFor="full_name">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder='Nhập họ và tên'
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="phone">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder='Nhập số điện thoại'
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
            <div className="flex mt-[20px]">
              <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600">
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

import Image from 'next/image';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Props = {};

const HeaderPreview = (props: Props) => {
  const [toggle, setToogle] = useState(false);
  const toggleNav = () => {
    setToogle(!toggle);
  };
  // const { data: session, status } = useSession();

  const getAll = true;
  return (
    <div className="shadow lg:shadow-none">
      <div className=" ">
        <div className="flex lg:hidden justify-between items-center pl-4 pr-4">
          <div className="w-[100px] h-[100px] relative">
            <Image src="/images/SimpleHouse_180.png" alt="logo" layout="fill" priority />
          </div>
          <div className="flex items-center" onClick={() => toggleNav()}>
            <FontAwesomeIcon className="text-2xl" icon={faBars} />
            <span className="ml-2">Danh mục</span>
          </div>
        </div>
      </div>
      <header
        className={`fixed lg:relative lg:block right-0 lg:right-0 top-0  w-4/5 lg:w-full h-full bg-white z-10 ease-in duration-300 ${
          toggle ? 'right-0' : 'right-[-100%]'
        }`}
      >
        <div className="container mx-auto bg-[#3f51b5] lg:bg-transparent p-4">
          <div className="flex flex-col gap-y-4 items-center h-fit  px-[15px] lg:px-0 py-[20px] lg:py-0">
            <Link href={'/'}>
              <a className="hidden lg:block w-[100px] h-[100px] relative">
                <Image src="/images/SimpleHouse_180.png" alt="logo" layout="fill" priority></Image>
              </a>
            </Link>
            <div>
              <h1 className="lg:text-xl xl:text-2xl font-bold">PHẦN MỀM QUẢN LÝ NHÀ TRỌ 24/7</h1>
              <h2>Đơn giản - Dễ sử dụng - Chính xác</h2>

              <div></div>
            </div>
            <div className="flex flex-col sm:grid-cols-2 sm:grid md:flex md:flex-row gap-2">
              <Link href={`/manager/landlord/list-home`}>
                <a className="h-auto rounded bg-[#ffc107] lg:bg-cyan-500 font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]">
                  Quản lý nhà trọ
                </a>
              </Link>
              <Link href={`/manager/ternant`}>
                <a className="h-auto rounded bg-[#ffc107] lg:bg-cyan-500 font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]">
                  Quản lý phòng trọ
                </a>
              </Link>
              {getAll && (
                <>
                  <Link href={`/auth`}>
                    <a className="h-auto rounded bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]">
                      Đăng nhập
                    </a>
                  </Link>

                  <button className="h-auto rounded bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]">
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <Navbar key="navbar" /> */}
        <button className="block lg:hidden absolute top-2 right-5 text-white text-2xl" onClick={() => toggleNav()}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </header>
      {toggle && (
        <div
          className="lg:before:bg-inherit before:bg-[#0000003b] before:w-full before:h-full before:absolute before:inset-0"
          onClick={() => toggleNav()}
        ></div>
      )}
    </div>
  );
};

export default HeaderPreview;

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from './style.module.css';
import { useUserContext } from '@/context/UserContext';
import Modal from 'react-responsive-modal';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toast } from 'src/hooks/toast';
import { getRoomBySubName } from 'src/pages/api/room';

type Props = {};

const HeaderPreview = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const param = router.query;
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const toggleNav = () => {
    setToggle(!toggle);
  };
  const { cookies, logoutResetData, setLoading, setCookie } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setLoading(true);

    await getRoomBySubName(data.code_room)
      .then((result) => {
        setLoading(false);
        setCookie('code_room', JSON.stringify(result.data.data), { path: '/', maxAge: 30 * 24 * 60 * 60 });
        // localStorage.setItem('code_room', JSON.stringify(result.data.data));
        router.push(`/manager/ternant`);
        Toast('success', 'Đăng nhập thành công');
      })
      .catch((err) => {
        setLoading(false);
        Toast('error', err?.response?.data?.message);
      });
  };

  return (
    <div className="shadow lg:shadow-none">
      <div className="flex lg:hidden justify-between items-center px-4">
        <div className="w-[100px] h-[100px] relative">
          <Image src="/images/SimpleHouse_180.png" alt="logo" layout="fill" priority />
        </div>
        <div className="flex items-center" onClick={() => toggleNav()}>
          <FontAwesomeIcon className="text-2xl" icon={faBars} />
          <span className="ml-2">Danh mục</span>
        </div>
      </div>

      <header
        className={`fixed lg:relative lg:block right-0 lg:right-0 top-0  w-4/5 lg:w-full h-full bg-white z-10 ease-in duration-300 ${
          toggle ? 'right-0' : 'right-[-100%]'
        }`}
      >
        <div className="container mx-auto bg-[#3f51b5] lg:bg-transparent p-4">
          <div className="flex flex-col lg:flex lg:flex-row lg:justify-between gap-y-4 items-start lg:items-center px-[15px] lg:p-0 py-[20px]">
            <Link href={'/'}>
              <a className="hidden lg:block w-[100px] h-[100px] relative">
                <Image src="/images/SimpleHouse_180.png" alt="logo" layout="fill" priority></Image>
              </a>
            </Link>
            <div>
              <h2 className="lg:text-xl xl:text-2xl font-bold">QUẢN LÝ NHÀ TRỌ 24/7</h2>
              <p>Đơn giản - Dễ sử dụng - Chính xác</p>
            </div>
              {cookies?.user && (
                <div className="flex flex-col md:flex md:flex-row gap-2">
                  <div className="flex flex-col md:flex md:flex-row gap-2">
                    <Link href={`/manager/landlord/list-home`}>
                      <a className="h-auto rounded bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white px-[15px] py-[10px]">
                        Quản lý nhà trọ
                      </a>
                    </Link>

                    <div className={`${styles['dropdown']} inline-block relative`}>
                      <button className="bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white px-[15px] py-[10px]">
                        Xin chào: {cookies?.user?.user.name}
                      </button>
                      <div className={`${styles['dropdown-menu']} absolute hidden text-gray-700 pt-2 rounded-md`}>
                        <Link href={'/auth/accountInformation'}>
                          <a className="rounded-md bg-slate-200 font-bold hover:text-gray-50 hover:bg-gray-400 py-2 px-4 block">
                            Thông tin tài khoản
                          </a>
                        </Link>
                        <Link href={'/auth/changePassword'}>
                          <a className="rounded-md bg-slate-200 font-bold hover:text-gray-50 hover:bg-gray-400 py-2 px-4 block">
                            Đổi mật khẩu
                          </a>
                        </Link>

                        <div
                          onClick={() => logoutResetData()}
                          className="rounded-md bg-slate-200 font-bold hover:text-gray-50 hover:bg-gray-400 py-2 px-4 block cursor-pointer"
                        >
                          Đăng xuất
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )}{' '}
            {!cookies?.user && (
              <div className="flex flex-col md:flex md:flex-row gap-2">
                <div className="flex flex-col md:flex md:flex-row gap-2">
                  <button
                    onClick={onOpenModal}
                    className="h-auto rounded bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]"
                  >
                    Kiểm tra thông tin phòng thuê
                  </button>
                  <div>
                    <Modal open={open} onClose={onCloseModal} center>
                      <div className="w-full">
                        <p className="pt-2 text-white">
                          -----------------------------------------------------------------------------------------------------------------------
                        </p>
                        <hr />
                        <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
                          <div className="">
                            <h2 className="pt-2 text-xl">Mời bạn nhập mã đăng nhập</h2>
                          </div>
                        </div>
                        <form
                          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                              Nhập mã
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="name"
                              type="text"
                              placeholder="Xin mời nhập mã"
                              {...register('code_room', { required: true })}
                            />
                            {errors.code_room?.type === 'required' && (
                              <span className="text-rose-600">Không được bỏ trống</span>
                            )}
                          </div>

                          <div className="flex items-center">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Đăng nhập
                            </button>
                          </div>
                        </form>
                      </div>
                    </Modal>
                  </div>
                  <div className={`${styles['dropdown']} inline-block relative`}>
                    <button className="bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]">
                      Đăng nhập/Đăng ki
                      <FontAwesomeIcon className="w-[12px] ml-2" icon={faCaretDown} />
                    </button>
                    <div
                      className={`${styles['dropdown-menu']} absolute hidden text-gray-700 pt-2 w-[210px] rounded-md`}
                    >
                      <div>
                        <Link href={'/auth/signin'}>
                          <a className="rounded-md bg-slate-200 font-bold hover:text-gray-50 hover:bg-gray-400 py-2 px-4 block">
                            Đăng nhập
                          </a>
                        </Link>
                      </div>

                      <div>
                        <Link href={'/auth/signup'}>
                          <a className="bg-slate-200 hover:bg-gray-400 hover:text-gray-50 rounded-md font-bold py-2 px-4 block">
                            Đăng kí
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <button className="block lg:hidden absolute top-2 right-5 text-white text-2xl" onClick={() => toggleNav()}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </header>
      {toggle && (
        <button
          className="lg:before:bg-inherit before:bg-[#0000003b] before:w-full before:h-full before:absolute before:inset-0"
          onClick={() => toggleNav()}
        ></button>
      )}
    </div>
  );
};

export default HeaderPreview;

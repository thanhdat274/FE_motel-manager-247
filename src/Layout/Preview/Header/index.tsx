import Image from 'next/image';
import React, { useState } from 'react';
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

type Props = {};

const HeaderPreview = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const param = router.query;
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const { setLoading } = useUserContext();
  const toggleNav = () => {
    setToggle(!toggle);
  };
  const { user, logoutResetData } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios.get('http://localhost:8800/api/room/' + data.code_room).then((data: any) => {
        setLoading(false);
        localStorage.setItem('code_room', JSON.stringify(data.data));
        router.push(`/manager/ternant`);
        Toast('success', 'Đăng nhập thành công');
      });
    } catch (error) {
      setLoading(false);

      Toast('error', 'Lỗi');
    }
  };

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
          <div className="flex flex-col lg:flex-row lg:justify-between gap-y-4 items-start lg:items-center h-fit  px-[15px] lg:px-0 py-[20px] lg:py-0">
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
              {!user ? (
                <div className={`${styles['dropdown']} dropdown inline-block relative`}>
                  <button className="bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]">
                    <span className="mr-1">Đăng nhập/Đăng kí</span>
                    <FontAwesomeIcon className="w-[12px]" icon={faCaretDown} />
                  </button>
                  <ul
                    className={`${styles['dropdown-menu']} dropdown-menu absolute hidden text-gray-700 pt-2 w-[210px] rounded-md`}
                  >
                    <li>
                      <Link href={'/auth/signin'}>
                        <a className="rounded-t rounded-md bg-slate-200 font-bold hover:text-gray-50 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                          Đăng nhập
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href={'/auth/signup'}>
                        <a className="bg-slate-200 hover:bg-gray-400 hover:text-gray-50 rounded-md font-bold py-2 px-4 block whitespace-no-wrap">
                          Đăng kí
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col sm:grid-cols-1 sm:grid md:flex md:flex-row gap-2">
                  <Link href={`/manager/landlord/list-home`}>
                    <a className="h-auto rounded bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]">
                      Quản lý nhà trọ
                    </a>
                  </Link>
                  <button
                    onClick={onOpenModal}
                    className="h-auto rounded bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]"
                  >
                    Quản lý phòng trọ
                  </button>
                  <div>
                    <Modal open={open} onClose={onCloseModal} center>
                      <div className="w-full">
                        <h1 className="pt-2">
                          -----------------------------------------------------------------------------------------------------------------------
                        </h1>
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

                  <div className={`${styles['dropdown']} dropdown inline-block relative`}>
                    <button className="bg-[#ffc107] lg:bg-[#3961fb] font-bold text-black lg:text-white inline-flex items-center justify-center px-[15px] py-[10px]">
                      <span className="mr-1">Xin chào: {user?.name}</span>
                    </button>
                    <ul
                      className={`${styles['dropdown-menu']} dropdown-menu absolute hidden text-gray-700 pt-2  rounded-md`}
                    >
                      <li>
                        <button
                          onClick={() => logoutResetData()}
                          className="rounded-t rounded-md bg-slate-200 font-bold hover:text-gray-50 hover:bg-gray-400 py-2 px-4 inline-block whitespace-no-wrap"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
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

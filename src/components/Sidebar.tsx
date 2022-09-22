import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ReactCalculator } from 'simple-react-calculator';
import {
    faBars, faCompass, faHouse, faHospital, faBox, faPlug, faShower, faCalculator, faCoins, faDesktop, faXmark
} from '@fortawesome/free-solid-svg-icons';

type Props = {}


const customStyles = {
    content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
    },
};

const SideBar = (props: Props) => {
    const Menus = [
        { url: '/', title: 'Home', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faHouse} /> },
        { url: '/manager/landlord', title: 'DashBoard', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faDesktop} /> },
        { url: '', gap: true, title: 'Phòng', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faHospital} /> },
        { url: '', title: 'Dịch vụ', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faBox} /> },
        { url: '/manager/landlord/electric-number', title: 'Số điện', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faPlug} /> },
        { url: '', title: 'Số nước', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faShower} /> },
        { url: '', title: 'Tính tiền', gap: true, icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCalculator} /> },
        { url: '', title: 'Phiếu chi', icon: <FontAwesomeIcon className="w-[16px] text-black" icon={faCoins} /> },
    ]
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    const router = useRouter();
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white w-[30%] py-3 px-6 h-screen md:w-full")}
                    >
                        <FontAwesomeIcon className="w-[16px] text-black" icon={faBars} />
                    </button>
                    {/* Brand */}
                    <Link href="/">
                        <a
                            href="#pablo"
                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        >
                            Quản Lý Phòng Trọ 24/7
                        </a>
                    </Link>
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            {/* <NotificationDropdown /> */}
                        </li>
                        <li className="inline-block relative">
                            {/* <UserDropdown /> */}
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link href="/">
                                        <a
                                            href="#pablo"
                                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold py-4 px-0"
                                        >
                                            QLPT 24/7
                                        </a>
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="ml-4 cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <FontAwesomeIcon className="w-[16px] text-black" icon={faXmark} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">

                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="lg:hidden border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form>


                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            {Menus.map((menu, index) => {
                                return (
                                    <li key={index} className="items-center rounded-lg mb-4 bg-gray-300 fw-500 cursor-pointer hover:bg-blue-500 round-md">
                                        <Link href={menu.url}>
                                            <a
                                                href="#pablo"
                                                className={
                                                    "text-xs py-3 font-bold block flex items-center gap-4 text-black px-4 py-3 bg-gradient-to-tr from-light-blue-500 to-light-blue-700 hover:text-white shadow-md" +
                                                    (router.pathname.indexOf(menu.url) !== -1
                                                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                        : "text-blueGray-700 hover:text-blueGray-500")
                                                }
                                            >
                                                {menu.icon}
                                                {menu.title}
                                            </a>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default SideBar
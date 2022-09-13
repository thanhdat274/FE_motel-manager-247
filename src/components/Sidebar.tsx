import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

const SideBar = (props: Props) => {
    const router = useRouter();
    return (
        <div>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 bg-blue-400">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    <Link href="/">
                        <a
                            href="#pablo"
                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase  p-4 px-0"
                        >
                            Quản lý phòng trọ 24/7
                        </a>
                    </Link>
                    <div
                        className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ">
                        {/* Form */}
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form>

                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase  block pt-1 pb-4 no-underline">
                            Admin Layout
                        </h6>

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <li className="items-center">
                                <Link href="/manager/landlord">
                                    <a
                                        href=""
                                        className={
                                            "text-xs uppercase py-3  block " +
                                            (router.pathname.indexOf("/admin/dashboard") !== -1
                                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                : "text-blueGray-700 hover:text-blueGray-500")
                                        }
                                    >
                                        <i
                                            className={
                                                "fas fa-tv mr-2 text-sm " +
                                                (router.pathname.indexOf("/admin/dashboard") !== -1
                                                    ? "opacity-75"
                                                    : "text-blueGray-300")
                                            }
                                        ></i>{" "}
                                        Trang chủ
                                    </a>
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link href="/admin/settings">
                                    <a
                                        href="#pablo"
                                        className={
                                            "text-xs uppercase py-3  block " +
                                            (router.pathname.indexOf("/admin/settings") !== -1
                                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                : "text-blueGray-700 hover:text-blueGray-500")
                                        }
                                    >
                                        <i
                                            className={
                                                "fas fa-tools mr-2 text-sm " +
                                                (router.pathname.indexOf("/admin/settings") !== -1
                                                    ? "opacity-75"
                                                    : "text-blueGray-300")
                                            }
                                        ></i>{" "}
                                        Số điện
                                    </a>
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link href="/admin/tables">
                                    <a
                                        href="#pablo"
                                        className={
                                            "text-xs uppercase py-3  block " +
                                            (router.pathname.indexOf("/admin/tables") !== -1
                                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                : "text-blueGray-700 hover:text-blueGray-500")
                                        }
                                    >
                                        <i
                                            className={
                                                "fas fa-table mr-2 text-sm " +
                                                (router.pathname.indexOf("/admin/tables") !== -1
                                                    ? "opacity-75"
                                                    : "text-blueGray-300")
                                            }
                                        ></i>{" "}
                                        Số nước
                                    </a>
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link href="/admin/maps">
                                    <a
                                        href="#pablo"
                                        className={
                                            "text-xs uppercase py-3  block " +
                                            (router.pathname.indexOf("/admin/maps") !== -1
                                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                : "text-blueGray-700 hover:text-blueGray-500")
                                        }
                                    >
                                        <i
                                            className={
                                                "fas fa-map-marked mr-2 text-sm " +
                                                (router.pathname.indexOf("/admin/maps") !== -1
                                                    ? "opacity-75"
                                                    : "text-blueGray-300")
                                            }
                                        ></i>{" "}
                                        Maps
                                    </a>
                                </Link>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase  block pt-1 pb-4 no-underline">
                            Auth Layout Pages
                        </h6>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                            <li className="items-center">
                                <Link href="/auth/login">
                                    <a
                                        href="#pablo"
                                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3  block"
                                    >
                                        <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
                                        Login
                                    </a>
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link href="/auth/register">
                                    <a
                                        href="#pablo"
                                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3  block"
                                    >
                                        <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                                        Register
                                    </a>
                                </Link>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase  block pt-1 pb-4 no-underline">
                            No Layout Pages
                        </h6>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                            <li className="items-center">
                                <Link href="/landing">
                                    <a
                                        href="#pablo"
                                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3  block"
                                    >
                                        <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                                        Landing Page
                                    </a>
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link href="/profile">
                                    <a
                                        href="#pablo"
                                        className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3  block"
                                    >
                                        <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                                        Profile Page
                                    </a>
                                </Link>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase  block pt-1 pb-4 no-underline">
                            Documentation
                        </h6>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default SideBar
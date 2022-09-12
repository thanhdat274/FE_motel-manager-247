import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import Image from "next/image";

export interface ILayoutAdminProps {
  children: ReactNode;
}
export const MENU = [
  { name: "Trang chủ", path: "/" },
  { name: "Cho thuê phòng trọ", path: "/cho-thue-phong-tro" },
  { name: "Nhà cho thuê", path: "/nha-cho-thue" },
  { name: "Cho thuê căn hộ", path: "/cho-thue-can-ho" },
  { name: "Blog", path: "/blog" },
  { name: "Hướng dẫn", path: "/gioi-thieu" },
  { name: "Nạp tiền", path: "/nap-tien" },
  { name: "Bảng giá", path: "/bang-gia" },
  { name: "Quản lý", path: "/quan-ly" },
];

export const MENU_ADMIN = [
  { name: "Quản lý tin đăng", path: "/quan-ly/quan-ly-tin-dang" },
  { name: "Sửa thông tin cá nhân", path: "/quan-ly/sua-thong-tin-ca-nhan" },
  { name: "Nạp tiền vào tài khoản", path: "/quan-ly/nap-tien" },
  { name: "Lịch sử thanh toán", path: "/quan-ly/lich-su-thanh-toan" },
  { name: "Bảng giá dịch vụ", path: "/bang-gia" },
  { name: "Liên hệ", path: "/lien-he" },
  { name: "Thoát", path: "/logout" },
];

const LayoutLandlords = ({ children }: ILayoutAdminProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  // const changeToggle = () => {
  //   setToggle(!toggle);
  // };
  const router = useRouter();

  console.log("fdfd", router.pathname.search("/manager/landlord"));

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              pink Tailwind Starter Kit
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Share</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Tweet</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Pin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LayoutLandlords;

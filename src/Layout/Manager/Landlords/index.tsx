import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import SideBar from '@/components/Sidebar';
import Navbar from '@/components/AdminNavbar';
import AdminFooter from '@/components/AdminFooter';

export interface ILayoutAdminProps {
  children: ReactNode;
}

const LayoutLandlords = ({ children }: ILayoutAdminProps) => {
  const [toggle, setToggle] = useState(false);
  const changeToggle = () => {
    setToggle(!toggle);
  };
  const router = useRouter();

  return (
    <div>
      <SideBar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          <div>{children}</div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
};

export default LayoutLandlords;

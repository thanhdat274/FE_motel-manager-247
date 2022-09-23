import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

import SideBar from '@/components/Sidebar';
import Navbar from '@/components/AdminNavbar';

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
      <Navbar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className=" mx-auto w-full h-full">
          <div className="bg-gray-100 p-4 min-h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutLandlords;

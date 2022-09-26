
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

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
      <div className='md:text-[12px]'>
        <SideBar />
        <Navbar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <div className="px-[8px] mx-auto w-full">
            <div className='bg-gray-100 ptb-4'>{children}</div>
            <AdminFooter />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LayoutLandlords;

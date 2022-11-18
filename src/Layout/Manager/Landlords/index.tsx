import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

import SideBar from '@/components/Sidebar';
import Navbar from '@/components/AdminNavbar';
import { useUserContext } from '@/context/UserContext';
import { CircleSpinnerOverlay } from 'react-spinner-overlay';

export interface ILayoutAdminProps {
  children: ReactNode;
}

const LayoutLandlords = ({ children }: ILayoutAdminProps) => {
  const { loading } = useUserContext();

  return (
    <div>
      {<CircleSpinnerOverlay loading={loading} color="#2563eb" size={100} message="Loadinggg" zIndex={9999} />}

      <SideBar />
      <Navbar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className=" mx-auto w-full h-full">
          <div className="bg-gray-100 p-4 min-h-screen sm:mt-[55px] s:mt-[55px] 2xs:mt-[55px] xs:mt-[55px] md:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutLandlords;

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import Image from 'next/image';

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
    <div className=" bg-gray-100">
      <div className="md:fixed md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300">
        <div className="flex-none w-56 flex flex-row items-center">image</div>

        <div className="animated md:hidden md:fixed md:top-0 md:w-full md:left-0 md:mt-16 md:border-t md:border-b md:border-gray-200 md:p-10 md:bg-white flex-1 pl-3 flex flex-row flex-wrap justify-between items-center md:flex-col md:items-center">
          <div className="flex flex-row-reverse items-center">
            <div className="icon">Icon</div>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-row flex-wrap">
        <div className="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 md:-ml-64 md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animated faster">
          <div className="flex flex-col text-red-400">thanh ben canh</div>
          <div className="bg-gray-100 flex-1 p-6 md:mt-16 grid grid-cols-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutLandlords;

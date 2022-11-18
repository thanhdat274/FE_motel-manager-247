import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { CircleSpinnerOverlay } from 'react-spinner-overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
type Props = {
  children: ReactNode;
};

const LayoutListHome = ({ children }: Props) => {
  const { loading } = useUserContext();

  return (
    <>
      {<CircleSpinnerOverlay loading={loading} color="#2563eb" size={100} message="Loadinggg" zIndex={9999} />}

      <div className=" mx-auto min-h-screen">
        <div className="w-full bg-gray-400">
          <Link href="/">
            <a className=' font-bold flex p-3'>

              <span> <FontAwesomeIcon className="w-[20px] mr-3" icon={faReply} /></span>
              <span > Trở về</span>
            </a>
          </Link>
        </div>
        {children}
      </div>
    </>
  );
};

export default LayoutListHome;

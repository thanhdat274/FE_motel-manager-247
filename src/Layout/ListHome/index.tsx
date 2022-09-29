import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { CircleSpinnerOverlay } from 'react-spinner-overlay';

type Props = {
  children: ReactNode;
};

const LayoutListHome = ({ children }: Props) => {
  const { loading } = useUserContext();

  return (
    <>
      {<CircleSpinnerOverlay loading={loading} color="#2563eb" size={100} message="Loadinggg" />}

      <div className="container mx-auto min-h-screen">
        <div className="w-full bg-gray-400">
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </div>
        {children}
      </div>
    </>
  );
};

export default LayoutListHome;

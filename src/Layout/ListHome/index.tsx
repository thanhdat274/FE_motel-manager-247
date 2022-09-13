import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LayoutListHome = ({ children }: Props) => {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="w-full bg-gray-400">
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default LayoutListHome;

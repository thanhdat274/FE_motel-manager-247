import React, { ReactNode } from 'react';
import FooterPreview from './Footer';
import HeaderPreview from './Header';
import { CircleSpinnerOverlay } from 'react-spinner-overlay';
import { useUserContext } from '@/context/UserContext';

type Props = {
  children: ReactNode;
};

const LayoutIntro = ({ children }: Props) => {
  const { loading } = useUserContext();

  return (
    <div className="m-auto bg-white w-full min-h-screen">
      {<CircleSpinnerOverlay loading={loading} color="#2563eb" size={100} message="Loadinggg" zIndex={9999} />}

      <div>
        <HeaderPreview />
      </div>
      <div>{children}</div>
      <FooterPreview />
    </div>
  );
};

export default LayoutIntro;

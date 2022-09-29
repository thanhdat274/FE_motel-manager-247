import React, { ReactNode } from 'react';
import { ReactCalculator } from 'simple-react-calculator';
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
    <div className=" m-auto bg-white min-h-screen ">
      {<CircleSpinnerOverlay loading={loading} color="#2563eb" size={100} message="Loadinggg" />}

      <HeaderPreview />
      <div className="chil ">{children}</div>
      <FooterPreview />
    </div>
  );
};

export default LayoutIntro;

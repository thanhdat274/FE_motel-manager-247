import React, { ReactNode } from 'react';
import FooterPreview from './Footer';
import HeaderPreview from './Header';

type Props = {
  children: ReactNode;
};

const LayoutIntro = ({ children }: Props) => {
  return (
    <div className="container mx-auto bg-white ">
      <HeaderPreview />
      <div className="chil">{children}</div>
      <FooterPreview />
    </div>
  );
};

export default LayoutIntro;

import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LayoutTenants = ({ children }: Props) => {
  return (
    <div>
      <div className="header">Header</div>
      {children}

      <div className="footer">footer</div>
    </div>
  );
};

export default LayoutTenants;

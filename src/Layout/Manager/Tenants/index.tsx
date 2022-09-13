import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LayoutTenants = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default LayoutTenants;

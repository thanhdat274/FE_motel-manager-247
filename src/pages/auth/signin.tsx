import Signin from '@/components/auth/signin';
import React, { useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

type Props = {};

const signin = (props: Props) => {
  return (
    <div>
      <CookiesProvider>
        <Signin />
      </CookiesProvider>
    </div>
  );
};

export default signin;

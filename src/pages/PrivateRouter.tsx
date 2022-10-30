import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

type PrivateRouterProps = {
  children: JSX.Element;
};

const PrivateRouter = (props: PrivateRouterProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const router = useRouter();
  useEffect(() => {
    if (!cookies?.user) {
      router.push(`/auth/signin`);
    }
  },[])
  return props.children;
};

export default PrivateRouter;

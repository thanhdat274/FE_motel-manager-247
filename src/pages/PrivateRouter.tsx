import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toast } from 'src/hooks/toast';
import { getInfoUser } from 'src/pages/api/auth';

type PrivateRouterProps = {
  children: JSX.Element;
};

export const PrivateRouter = (props: PrivateRouterProps) => {
  const { cookies } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    if (!cookies?.user) {
      router.push(`/auth/signin`);
    }
  }, []);
  return props.children;
};

export const CheckUser = (props: PrivateRouterProps) => {
  const { cookies, logoutResetData } = useUserContext();
  const userData = cookies?.user;
  if (cookies?.user) {
    const getUsers = async () => {
      await getInfoUser(userData.user._id, userData.token)
        .then(() => {
          return props.children;
        })
        .catch((error) => {
          Toast('error', error?.response?.data.error + 'và đăng xuất sau 2s');
          setTimeout(() => {
            logoutResetData();
          }, 2000);
        });
    };
    getUsers();
  }
  return props.children;
};

export default PrivateRouter;

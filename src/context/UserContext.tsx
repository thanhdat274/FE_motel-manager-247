import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { Toast } from 'src/hooks/toast';
import useCookies from 'react-cookie/cjs/useCookies';

export interface UserState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user: any;
  setUser: (loading: any) => void;
  dateOfBirth: number;
  setDateOfBirth: (loading: number) => void;
  phoneNumber: string;
  setPhoneNumber: (loading: string) => void;
  token: string;
  setToken: (loading: string) => void;
  logoutResetData: () => void;
  cookies: any;
  setCookie: any;
}

const UserContext = createContext<UserState | null>(null);

export const useUserContext = (): UserState => useContext(UserContext) as UserState;

export const UserProvider = ({ children }: any) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user','code_room']);

  const logoutResetData = () => {
    setLoading(true);
    removeCookie('user', { path: '/', maxAge: 30 * 24 * 60 * 60 });
    removeCookie('code_room', { path: '/', maxAge: 30 * 24 * 60 * 60 });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    router.push(`/`);
    Toast('success', 'Đăng xuất thành công!');
  };
  const value: UserState = {
    loading,
    setLoading,
    user,
    setUser,
    dateOfBirth,
    setDateOfBirth,
    phoneNumber,
    setPhoneNumber,
    token,
    setToken,
    logoutResetData,
    cookies,
    setCookie,
  };

  return (
    <div>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </div>
  );
};

export default UserProvider;

import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { createContext } from 'react';
import { Toast } from 'src/hooks/toast';

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

  const logoutResetData = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    setLoading(true);
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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

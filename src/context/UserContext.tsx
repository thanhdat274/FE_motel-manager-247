import React, { useContext, useState } from 'react';
import { createContext } from 'react';

export interface UserState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userName: string;
  setUserName: (loading: string) => void;
  dateOfBirth: number;
  setDateOfBirth: (loading: number) => void;
  phoneNumber: string;
  setPhoneNumber: (loading: string) => void;
  token: string;
  setToken: (loading: string) => void;
}

const UserContext = createContext<UserState | null>(null);

export const useUserContext = (): UserState => useContext(UserContext) as UserState;

export const UserProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState('');

  const value: UserState = {
    loading,
    setLoading,
    userName,
    setUserName,
    dateOfBirth,
    setDateOfBirth,
    phoneNumber,
    setPhoneNumber,
    token,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

import instance from './instance';

export const SignIn = (data: {}) => {
  const url = `/signin`;
  return instance.post(url, data);
};

export const UserSignup = (data: any) => {
  const url = `/signup`;
  return instance.post(url, data);
};

export const UserInfo = (userData: any) => {
  const url = `/user/${userData.user._id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};
export const UpdateUserInfo = (newData: any) => {
  const url = `/user/${newData.userData.user._id}`;
  return instance.put(url, newData, {
    headers: {
      Authorization: `Bearer ${newData.userData.token}`,
    },
  });
};
export const getInfoUser = (idUser: string, token: string) => {
  const url = `/user/${idUser}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fogetPassword = (data: any) => {
  const url = '/forgot-password';
  return instance.post(url, data);
};
export const resetPassword = (data: any) => {
  const url = '/reset_password';
  return instance.post(url, data);
};
export const changePassword = (data: any) => {
  const url = '/change-password';
  return instance.put(url, data);
};


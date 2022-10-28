import instance from './instance';

export const SignIn = (data: {}) => {
  const url = `/signin`;
  return instance.post(url, data);
};

export const UserSignup = (data: any) => {
  const url = `/signup`;
  return instance.post(url, data);
};

export const getInfoUser = (idUser: string, token: string) => {
  const url = `/user/${idUser}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

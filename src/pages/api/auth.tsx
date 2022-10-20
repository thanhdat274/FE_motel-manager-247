import instance from './instance';

export const SignIn = (data: {}) => {
  const url = `/signin`;
  return instance.post(url, data);
};

export const UserSignup = (data: any) => {
  const url = `/signup`;
  return instance.post(url, data);
};

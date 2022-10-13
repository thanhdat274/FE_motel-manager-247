import instance from './instance';

export const SignIn = (data:{}) => {
  const url = `/signin`;
  return instance.post(url, data, {
    headers: {
      "Content-Type": `multipart/form-data`
  }
  })
};

export const UserSignup = (data: any) => {
    const url = `/signup`;
    return instance.post(url, data);
  };

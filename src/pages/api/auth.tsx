import instance from "./instance";
export const UserSignup = (data: any) => {
    const url = `/signup`;
    return instance.post(url, data);
  };
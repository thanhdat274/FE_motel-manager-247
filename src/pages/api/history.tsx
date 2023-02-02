import instance from './instance';

export const historyDelete = (id: any,userData: { user: { id: any; }; token: any; }) => {
  const url = `/list-histories/${userData.user.id}/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
  });
};


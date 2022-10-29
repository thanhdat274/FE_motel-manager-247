import instance from './instance';
export const CreateBill = (newData: any) => {
  const url = `/bill/${newData.idRoom}`;
  return instance.post(url, newData, {
    headers: {
      Authorization: `Bearer ${newData.userData.token}`,
    },
  });
};

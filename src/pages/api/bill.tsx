import { useEffect } from 'react';
import instance from './instance';

export const listBill = ( newData: any) => {
  const url = `/bill/list/${newData.userData.user._id}`;
  return instance.post(url,newData, {
    headers: {
      Authorization: `Bearer ${newData.userData.token}`,
    },
  });
};
export const readBill = (id:any, newData: any) => {
  const url = `/bill/detail/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${newData.token}`,
    },
  });
};
export const CreateBillHouseAll = (newData: any) => {
  const url = `/bill-house-all/${newData.idHouse}`;
  return instance.post(url, newData, {
    headers: {
      Authorization: `Bearer ${newData.userData.token}`,
    },
  });
};

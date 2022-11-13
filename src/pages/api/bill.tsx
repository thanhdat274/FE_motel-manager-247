import { LogarithmicScale } from 'chart.js';
import { useEffect } from 'react';
import instance from './instance';

export const listBill = (userData: any, year: number, month: number) => {
  const url = `/bill-all/list/${userData.user._id}/${year}/${month}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};
export const readBill = (id: any, newData: any) => {
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
export const CreateBillRooms = (newDataRooms: any) => {
  const url = `/bill-room`;
  return instance.post(url, newDataRooms, {
    headers: {
      Authorization: `Bearer ${newDataRooms.userData.token}`,
    },
  });
};
export const getBillIdRoom = (idRoom: string, year: number, month: number) => {
  const url = `/bill-room/${idRoom}/${year}/${month}`;
  return instance.get(url);
};
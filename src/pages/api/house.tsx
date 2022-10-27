import { useEffect } from 'react';
import instance from './instance';

export const listHouse = (userData: any) => {
  const url = `/house/${userData.user._id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};

export const addHouse = (data: any) => {
  const url = `/house/${data.userData.user._id}`;
  return instance.post(url, data, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${data.userData.token}`,
    },
  });
};

export const removeHouses = (data: any) => {
  const url = `/house/${data._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${data.userData.token}`,
    },
  });
};
export const readHouse = (id_home: string, userData: any) => {
  const url = `/house/detail/${id_home}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};
export const updateHouse = (house: any) => {
  const url = `/house/${house._id}`;
  return instance.put(url, house, {
    headers: {
      Authorization: `Bearer ${house.userData.token}`,
    },
  });
};

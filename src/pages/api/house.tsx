import { useEffect } from 'react';
import instance from './instance';

export const listHouse = (a: any) => {
  const url = `/house/${a.user._id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const addHouse = (data: any) => {
  const url = `/house/${data.a.user._id}`;
  return instance.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};

export const removeHouses = (data: any) => {
  const url = `/house/${data._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};
export const readHouse = (id_home: string, a: any) => {
  const url = `/house/detail/${id_home}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const updateHouse = (house: any) => {
  const url = `/house/${house._id}`;
  return instance.put(url, house, {
    headers: {
      Authorization: `Bearer ${house.a.token}`,
    },
  });
};

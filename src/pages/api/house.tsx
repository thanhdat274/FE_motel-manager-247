import { useEffect } from 'react';
import instance from './instance';

export const listHouse = (a: any) => {
  const url = `house/${a.user._id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const addHouse = (data: any) => {
  const a = JSON.parse(localStorage.getItem('user') as string);

  const url = `/house/${a.user._id}`;
  return instance.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "type": "formData",
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const removeHouses = (_id: number) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `house/${_id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const readHouse = (id_home: string) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `house/detail/${id_home}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const updateHouse = (house: any) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `house/${house._id}`;
  return instance.put(url, house, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "type": "formData",
      Authorization: `Bearer ${a.token}`,
    },
  });
};

import { useEffect } from 'react';
import instance from './instance';

export const listRoom = (id:any) => {
  const a = JSON.parse(localStorage.getItem('user') as string);

  const url = `list-room/${a.user._id}/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const addRoom = (data: any) => {
  const a = JSON.parse(localStorage.getItem('user') as string);
  const url = `/room/${a.user._id}`;
  return instance.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const removeRoom = (_id: number) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `room/${_id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const readRoom = (id_home: string) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `room/detail/${id_home}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const updateRoom = (house: any) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `room/${house._id}`;
  return instance.put(url, house, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
      Authorization: `Bearer ${a.token}`,
    },
  });
};

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
  const url = `/room/add`;
  return instance.post(url, data, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // Accept: 'application/json',
      // type: 'formData',
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const removeRoom = (id: number) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `room/remove/${id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const readRoom = (id_room: string) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `room/${id_room}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const updateRoom = (room: any) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `/room/update/${room._id}`;
  return instance.put(url, room, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // Accept: 'application/json',
      // type: 'formData',
      Authorization: `Bearer ${a.token}`,
    },
  });
};

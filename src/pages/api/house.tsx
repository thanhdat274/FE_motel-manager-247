import { useEffect } from 'react';
import instance from './instance';




export const listHouse = (a:any) => {

  const url = `house/${a.user._id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const addHouse = (data: any) => {
  const url = `/houses`;
  return instance.post(url, data);
};

export const removeHouse = (id: number) => {
  const url = `houses/${id}`;
  return instance.delete(url);
};
export const readHouse = (id: string) => {
  const url = `houses/${id}`;
  return instance.get(url);
};
export const updateHouse = (data: any) => {
  const url = `houses/${data.id}`;
  return instance.put(url, data);
};


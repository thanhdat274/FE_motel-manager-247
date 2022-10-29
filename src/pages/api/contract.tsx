import { useEffect } from 'react';
import instance from './instance';

export const listContract = () => {
  const url = `contract`;
  return instance.get(url);
};

export const addContract = (data: any) => {
  const url = `contract`;
  return instance.post(url, data);
};


export const readContract = (id_home: string) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `contract`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};


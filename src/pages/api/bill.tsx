import { useEffect } from 'react';
import instance from './instance';

export const listBill = ( userData: any) => {
  const url = `/bill/list/${userData.user._id}`;
  return instance.post(url, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};



import { useEffect } from 'react';
import instance from './instance';

export const listRoom = (id: any, a: any) => {
  const url = `/list-room/${a.user._id}/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const addRoom = (data: any) => {
  const url = `/room/add`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};

export const removeRoom = (data: any) => {
  const url = `/room/remove/${data._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};
export const readRoom = (id_room: string, a: any) => {
  const url = `/room/${id_room}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const updateRoom = (room: any) => {
  const url = `/room/update/${room._id}`;
  return instance.put(url, room, {
    headers: {
      Authorization: `Bearer ${room.a.token}`,
    },
  });
};

//  api people

export const addPeople = (id:any,data: any) => {
  const url = `/room/${id}/member/add`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};

export const removePeople = (_id:any,data: any) => {
  const url = `/room/${_id}/member/remove`;
  return instance.post(url,data, {
    headers: {
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};

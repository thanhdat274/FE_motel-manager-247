import instance from './instance';

export const listRoom = (id: any, userData: any) => {
  const url = `/list-room/${userData.user._id}/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};

export const addRoom = (data: any) => {
  const url = `/room/add`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data.userData.token}`,
    },
  });
};

export const removeRoom = (data: any) => {
  const url = `/room/remove/${data._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${data.userData.token}`,
    },
  });
};

export const readRoom = (id_room: string, userData: any) => {
  const url = `/room/${id_room}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};

export const updateRoom = (room: any) => {
  const url = `/room/update/${room._id}`;
  return instance.put(url, room, {
    headers: {
      Authorization: `Bearer ${room.userData.token}`,
    },
  });
};

//  api people

export const addPeople = (id: any, data: any) => {
  const url = `/room/${id}/member/add`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data.userData.token}`,
    },
  });
};

export const removePeople = (_id: any, data: any) => {
  const url = `/room/${_id}/member/remove`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data.userData.token}`,
    },
  });
};

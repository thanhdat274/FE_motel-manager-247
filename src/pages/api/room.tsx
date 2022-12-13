import instance from './instance';
import axios from "axios";

export const listRoom = (id: any, userData: any) => {
  const url = `/list-room/${userData?.user?._id}/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
  });
};

export const addRoom = (data: any) => {
  const url = `/room/add`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  });
};

export const removeRoom = (data: any) => {
  const url = `/room/remove/${data?._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  });
};

export const getRoomBySubName = (subName: string) => {
  const url = `/room/get-data/${subName}`;
  return instance.get(url);
};

export const readRoom = (id_room: string, userData: any) => {
  const url = `/room/${id_room}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
  });
};
export const updateRoom = (newData: any) => {
  const url = `/room/update/${newData?.idRoom}`;
  return instance.put(url, newData, {
    headers: {
      Authorization: `Bearer ${newData?.token}`,
    },
  });
};

//  api people

export const addPeople = (id: any, data: any) => {
  const url = `/room/${id}/member/add`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  });
};

export const removePeople = (_id: any, data: any) => {
  const url = `/room/${_id}/member/remove`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  });
};
// api ma dang nhap

export const loginCode = (data: any) => {
  const url = `/rom/edit-code-room`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  });
};

// hàm upload ảnh hợp đồng
export const upload = async (file: any) => {
  const CLOUNDINARY_URL = "https://api.cloudinary.com/v1_1/dvj4wwihv/image/upload";
  const CLOUNDINARY_PRESET = "js8yqruv";
  const formData = new FormData();
  formData.append("file", file.file.name);
  formData.append("upload_preset", CLOUNDINARY_PRESET);

  const { data } = await axios.post(CLOUNDINARY_URL, formData, {
    headers: { "Content-Type": "application/form-data" },
  });

  return data.url;
};

export const addServiceRoom = (idRoom: string, params: any, userData: any) => {
  const url = `/room/${idRoom}/service/add`;
  return instance.post(url, params, {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
  });
};
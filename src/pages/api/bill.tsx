
import instance from './instance';

export const listBill = (userData: any, idHouse: any, year: number, month: number) => {
  const url = `/bill-all/list/${userData?.user?._id}/${idHouse}/${year}/${month}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
  });
};
export const readBill = (id: any, newData: any) => {

  const url = `/bill/detail/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${newData?.token}`,
    },
  });
};
export const CreateBillHouseAll = (newData: any) => {
  const url = `/bill-house-all/${newData?.idHouse}`;
  return instance.post(url, newData, {
    headers: {
      Authorization: `Bearer ${newData?.userData?.token}`,
    },
  });
};
export const CreateBillRooms = (newDataRooms: any) => {
  const url = `/bill-room`;
  return instance.post(url, newDataRooms, {
    headers: {
      Authorization: `Bearer ${newDataRooms?.userData?.token}`,
    },
  });
};
export const paymentStatus = (data: any, userData: any) => {
  const url = `/bill-update/${data._id}`;
  return instance.put(url, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};
export const getBillIdRoom = (idRoom: string, year: number, month: number) => {
  const url = `/bill-room/${idRoom}/${year}/${month}`;
  return instance.get(url);
};

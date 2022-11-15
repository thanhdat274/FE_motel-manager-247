import instance from './instance';

export const createAllBillForHouse = (data: any) => {
  const url = `/bill/create-for-house`;
  return instance.post(url, data);
};

export const getAllBillForHouse = (type: string, month: number, year: number, idHouse: any) => {
  const url = `/bill/${type}/${idHouse}/${month}/${year}`;
  return instance.get(url);
};

export const getListService = (id: string, userData: any, nameBill: string, monthCheck: any, yearCheck: any) => {
  const url = `/bill/get-list/${id}/${nameBill}/${monthCheck}/${yearCheck}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
  });
};
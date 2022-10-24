import instance from './instance';

export const createAllBillForHouse = (data: any) => {
  const url = `/bill/create-for-house`;
  return instance.post(url, data);
};

export const getListService = (id: string, a: any, nameBill: string, monthCheck: any, yearCheck: any) => {
  const url = `/bill/get-list/${id}/${nameBill}/${monthCheck}/${yearCheck}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

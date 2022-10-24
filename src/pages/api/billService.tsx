import instance from './instance';

export const createAllBillForHouse = (data: any) => {
  const url = `/bill/create-for-house`;
  return instance.post(url, data);
};
export const getListElictric = (idHouse: any, typeBill: any, month: any, year: any) => {
  const url = `/bill/get-list/${idHouse}/${typeBill}/${month}/${year}`;
  // /bill/get-list/:idHouse/:type/:month/:year
  return instance.get(url);
};

export const getListService = (id: string, userData: any, nameBill: string, monthCheck: any, yearCheck: any) => {
  const url = `/bill/get-list/${id}/${nameBill}/${monthCheck}/${yearCheck}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });
};

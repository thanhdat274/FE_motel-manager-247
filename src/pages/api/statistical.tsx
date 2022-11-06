import instance from './instance';

export const getAllStatusRooms = (id: any) => {
  const url = `/statistical/${id}/room-status`;
  return instance.get(url);
};
export const getAllBillServiceByYear = (id: any, year: any, name: any) => {
  const url = `/statistical/${id}/${year}/${name}/get-all-bill-service`;
  return instance.get(url);
};

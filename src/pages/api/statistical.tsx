import instance from './instance';

export const getAllStatusRooms = (id: any) => {
  const url = `/statistical/${id}/room-status`;
  return instance.get(url);
};
export const getAllBillServiceByYear = (id: any, year: any, name: any) => {
  const url = `/statistical/${id}/${year}/${name}/get-all-bill-service`;
  return instance.get(url);
};
export const getBillServiceByYear = (idRooms: any, NameBuild: any, year: any) => {
  const url = `/statistical/get-bill-service/${idRooms}/${NameBuild}/${year}`;
  return instance.get(url);
};
export const getDetailBillServiceByMonthYear = (idRooms: any, NameBuild: any, month: any, year: any) => {
  const url = `/statistical/get-detail-bill-service/${idRooms}/${NameBuild}/${month}/${year}`;
  return instance.get(url);
};

export const getValueCountStatis = () => {
  const url = `/statistical/get-statis`;
  return instance.get(url);
}
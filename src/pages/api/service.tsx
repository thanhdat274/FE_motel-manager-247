import instance from './instance';
import { removeHouses, readHouse } from './house';

export const ListService = (id: string, a: any) => {
  const url = `/service-house/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const getInfoService = (idHouse: any, name: string) => {
  const url = `/service/get-service/${idHouse}/${name}`;
  return instance.get(url);
};

export const removeService = (data: any) => {
  const url = `/service/remove/${data.idHouse}/${data.idService}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};
export const addService = (data: any) => {
  const url = `/service/create`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};

export const readService = (idService: any, a: any) => {
  const url = `/service/${idService}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const updateService = (data: any) => {
  const url = `/service/update/${data._id}`;
  return instance.patch(url, data, {
    headers: {
      Authorization: `Bearer ${data.a.token}`,
    },
  });
};

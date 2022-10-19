import instance from './instance';
import { removeHouses, readHouse } from './house';

export const ListService = (id: string) => {
  const a = JSON.parse(localStorage.getItem('user') as string);
  const url = `/service-house/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const removeService = (data: any) => {
  const a = JSON.parse(localStorage.getItem('user') as any);

  const url = `/service/remove/${data.idHouse}/${data.idService}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};
export const addService = (data: any) => {
  const a = JSON.parse(localStorage.getItem('user') as string);

  const url = `/service/create`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const readService = (idService: any) => {
  const a = JSON.parse(localStorage.getItem('user') as string);

  const url = `/service/${idService}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
};

export const updateService = (data: any) => {
  console.log(data._id)
  const a = JSON.parse(localStorage.getItem('user') as string);

  const url = `/service/update/${data._id}`;
  return instance.patch(url, data,{
    headers: {
      Authorization: `Bearer ${a.token}`,
    },
  });
}

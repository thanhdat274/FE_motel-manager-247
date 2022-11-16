import instance from './instance';

export const ListService = (id: string, userData: any) => {
  const url = `/service-house/${id}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
  });
};

export const getInfoService = (idHouse: any, name: string) => {
  const url = `/service/get-service/${idHouse}/${name}`;
  return instance.get(url);
};

export const removeService = (data: any) => {
  const url = `/service/remove/${data?.idHouse}/${data?.idService}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  });
};
export const addService = (data: any) => {
  const url = `/service/create`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  });
};
export const readService = (idService: any, userData: any) => {
  const url = `/service/${idService}`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
  });
};
export const updateService = (data: any) => {
  const url = `/service/update/${data?._id}`;
  return instance.patch(url, data, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  });
};

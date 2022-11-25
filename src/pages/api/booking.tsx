import instance from './instance';

export const createBooking = (data:any) => {  
  console.log(data);
    
  const url = `/booking/create`;
  return instance.post(url, data , {
    headers: {
      Authorization: `Bearer ${data.userData?.token}`,
    },
  });
};
export const listBooking = (userData:any, id:any ) => {  
    const url = `/booking/list/${id}`;
    return instance.get(url , {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    });
  };

  export const createBookingRoom = (data:any) => {  
    const url = `/booking/accept-take-room`;
    return instance.post(url, data , {
      headers: {
        Authorization: `Bearer ${data?.userData?.token}`,
      },
    });
  };

  export const deleteBooking = (id:any, userData:any) => {  
  
    const url = `/booking/remove-booking/${id}`;
    return instance.delete(url,{
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    });
  };

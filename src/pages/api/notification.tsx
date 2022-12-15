import instance from "./instance";

export const listReports = (data:any) =>{
 const url = `/report/list-house/${data.id}`
 return instance.get(url, {
    headers: {
      Authorization: `Bearer ${data?.userData?.token}`,
    },
  } )
}
export const listReport = (id:any) =>{
  const url = `/report/list-room/${id}`
  return instance.get(url )
 }

 export const listReportStatus = (id:any) =>{
  const url = `/report/count-not-complete/${id}`
  return instance.get(url )
 }
 export const removeReport = (id:any) =>{
  const url = `/report/remove/${id}`
  return instance.delete(url )
 }

export const addReport = (data:any) =>{
    const url = `/report/create`
    return instance.post(url,data)
   }
   export const updateReport = (data:any) =>{
    const url = `/report/update/${data._id}`
    return instance.put(url,data, {
       headers: {
         Authorization: `Bearer ${data?.userData?.token}`,
       },
     } )
   }
import BarChart from '@/components/chart/Bar';
import { PieChart } from '@/components/chart/Pie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { faChartSimple, faHouse, faPerson } from '@fortawesome/free-solid-svg-icons';
import { getAllBillServiceByYear, getAllStatusRooms, statisticalPayment } from 'src/pages/api/statistical';
import BarDien from '@/components/chart/barDien';
import BarNuoc from '@/components/chart/barNuoc';
import BarPayment from '@/components/chart/barPayment';
import Link from 'next/link';

const HomeManagerPage = () => {
  const [roomStatisticals, setRoomStatisticals] = useState<any>([]);
  const [roomNotUsing, setRoomNotUsing] = useState<any>();
  const [roomReadyUsing, setRoomReadyUsing] = useState<any>();
  const [roomReadyEmpty, setRoomReadyEmpty] = useState<any>();
  const [roomExpiration, setRoomExpiration] = useState<any>();

  const [totalWater, setTotalWater] = useState<any>([]);
  const [totalElictic, setTotalElictric] = useState<any>([]);
  const [totalMoneys, setTotalMoneys] = useState<any>([]);
  const [checkYear, setCheckYear] = useState(new Date().getFullYear());
  const router = useRouter();
  const { id } = router.query;
  const yearStatistical = new Date().getFullYear();
  let years = Array.from(new Array(40), (val, index) => yearStatistical - index);
  const checkNameNuoc = 'nuoc';
  const checkNameDien = 'dien';
  const today = new Date()

  const yearShow = React.useMemo(() => {
    const onChange = (data: any) => {
      setCheckYear(parseInt(data.target.value));
    };
    return (
      <div className="">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
          Chọn năm thống kê
        </label>
        <select
          className="mt-2 shadow appearance-none border rounded w-[10%] 2xs:w-[20%] xs:w-[20%] s:w-[20%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          onChange={onChange}
        >
          {years.map((year, index) => {
            return (
              <option key={index} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    );
  }, [checkYear]);

  useEffect(() => {
    if (id) {
      const getStatusRoom = async () => {
        try {
          const { data } = await getAllStatusRooms(id);
          if (data) {
            setRoomNotUsing(data?.roomNotReady)
            setRoomReadyUsing(data?.roomReadyUsing)
            setRoomReadyEmpty(data?.roomReadyEmpty)
            setRoomStatisticals(data as any);
            const arrData = data?.listRoomContractExpiration?.sort((Room1: any, Room2: any) => {
              return (new Date(Room1.contract?.endTime).getTime() - today.getTime()) - (new Date(Room2.contract?.endTime).getTime() - today.getTime());
            })
            setRoomExpiration(arrData)
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      getStatusRoom();
      if (checkYear) {
        const getTotalWater = async () => {
          try {
            const { data } = await getAllBillServiceByYear(id, checkYear, checkNameNuoc);
            if (data.data) {
              setTotalWater(data.data as any);
            }
          } catch (error) {
            console.log('error', error);
          }
        };
        getTotalWater();
        const getTotalElictric = async () => {
          try {
            const { data } = await getAllBillServiceByYear(id, checkYear, checkNameDien);
            if (data.data) {
              setTotalElictric(data.data as any);
            }
          } catch (error) {
            console.log('error', error);
          }
        };
        getTotalElictric();

        const getTotaMoney = async () => {
          try {
            const { data } = await statisticalPayment(id, checkYear);
            if (data.data) {
              setTotalMoneys(data.data as any);
            }
          } catch (error) {
            console.log('error', error);
          }
        };
        getTotaMoney();
      }
    }
  }, [id, checkYear]);


  return (
    <div className="w-full gap-4 flex flex-col ">
      <header className="bg-white shadow border rounded-md">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Bảng thống kê nhà
              </h2>
            </div>
          </div>
        </div>
      </header>
      <div className='w-full flex gap-y-4 lg:flex-nowrap lg:gap-4 xl:flex-nowrap flex-wrap'>
        <div className="w-full lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <div className="flex flex-[100%] xl:flex-nowrap flex-wrap lg:gap-5 sm:gap-2 gap-y-2 md:gap-2 justify-between h-full">
            <Link href={`${id}/list-room`}>
              <a className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-blue-300 shadow border rounded-md">
                <div className="max-w-full">
                  <div>
                    <p className="mb-0 font-sans font-bold leading-normal text-sm text-black dark:opacity-60 pr-4 h-[40px]">Tổng số</p>
                    <h5 className="mb-0 lg:text-xl italic font-bold mt-4">{roomStatisticals?.roomReadyEmpty?.count + roomStatisticals?.roomNotReady?.count + roomStatisticals?.roomReadyUsing?.count} phòng</h5>
                  </div>
                </div>
                <div className="max-w-full block lg:hidden">
                  <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                    <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faHouse} />
                  </div>
                </div>
              </a>
            </Link>
            <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-white shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Người thuê phòng</p>
                  {/* <h5 className="mb-0">{roomStatisticals.numberMemberInHouse} người</h5> */}
                  <h5 className="mb-0 lg:text-xl italic font-bold mt-4">{roomStatisticals?.numberMemberInHouse} người</h5>
                </div>
              </div>
              <div className="max-w-full block lg:hidden">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faPerson} />
                </div>
              </div>
            </div>
            <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-green-300 shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Phòng đang sử dụng</p>
                  {/* <h5 className="mb-0">{roomStatisticals.roomReadyUsing} phòng</h5> */}
                  <h5 className="mb-0 lg:text-xl italic font-bold mt-4"> {roomStatisticals?.roomReadyUsing?.count} phòng</h5>
                </div>
              </div>
              <div className="max-w-full block lg:hidden">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faHouse} />
                </div>
              </div>
            </div>
            <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-red-300 shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Phòng đang sửa chữa</p>
                  {/* <h5 className="mb-0">{roomStatisticals.roomNotReady} phòng</h5> */}
                  <h5 className="mb-0 lg:text-xl italic font-bold mt-4">{roomStatisticals?.roomNotReady?.count}  phòng</h5>
                </div>
              </div>
              <div className="max-w-full block lg:hidden">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faChartSimple} />
                </div>
              </div>
            </div>
            <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-yellow-200 shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60 pr-4">Phòng trống</p>
                  {/* <h5 className="mb-0">{roomStatisticals.roomReadyEmpty} phòng</h5> */}
                  <h5 className="mb-0 lg:text-xl italic font-bold mt-4">{roomStatisticals?.roomReadyEmpty?.count} phòng</h5>
                </div>
              </div>
              <div className="max-w-full block lg:hidden">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faHouse} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <h3 className='font-bold text-xl m-4 text-center border-0 border-b-[1px] pb-2'>Danh sách các phòng đang sửa chữa</h3>
          <div className='overflow-x-auto max-h-[200px]'>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-9 w-[50px] py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tên phòng
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Giá phòng
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 max-h-5 overflow-auto">
                {
                  roomNotUsing?.list?.map((roomReady: any, index: number) => {
                    const priceRoom = parseInt(roomReady?.price)
                    return (
                      <tr className='cursor-pointer' key={index} onClick={() => router.push(`/manager/landlord/${id}/list-room/${roomReady?._id}`)}>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">{roomReady?.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">{priceRoom?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                          {/* {?.amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND'})} */}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-y-4 lg:flex-nowrap lg:gap-4 xl:flex-nowrap flex-wrap">
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <h3 className='font-bold text-xl m-4 text-center border-0 border-b-[1px] pb-2'>Danh sách các phòng trống</h3>
          <div className='overflow-x-auto max-h-[250px]'>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-9 w-[50px] py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tên phòng
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Giá phòng
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 max-h-5 overflow-auto">
                {
                  roomReadyEmpty?.list?.map((roomReady: any, index: number) => {
                    const priceRoom = parseInt(roomReady?.price)
                    return (
                      <tr className='cursor-pointer' key={index} onClick={() => router.push(`/manager/landlord/${id}/list-room/${roomReady?._id}`)}>
                        <td className="px-9 py-4 whitespace text-sm text-gray-500">
                          <div className="text-center">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">{roomReady?.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace">
                          <div className="text-center">{priceRoom?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <h3 className='font-bold text-xl m-4 text-center border-0 border-b-[1px] pb-2'>Danh sách các phòng sắp hết hợp đồng</h3>
          <div className='overflow-x-auto max-h-[250px]'>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-9 w-[50px] py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tên phòng
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ngày hết hạn
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 max-h-5 overflow-auto">
                {
                  roomExpiration?.map((roomReady: any, index: number) => {


                    const endDate1 = new Date(roomReady?.contract?.endTime)
                    const timeEnd = Math.ceil((endDate1.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
                    if (timeEnd < 15) {
                      return (
                        <tr className={`cursor-pointer ` + (Math.ceil((endDate1.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)) <= 5 ? 'bg-red-200' : "")} key={index} onClick={() => router.push(`/manager/landlord/${id}/list-room/${roomReady?._id}`)}>
                          <td className="px-9 py-4 whitespace text-sm text-gray-500">
                            <div className="text-center">{index + 1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">{roomReady?.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace">
                            <div className="text-center">{timeEnd < 0 ? `Đã quá hạn ${timeEnd * -1} ` : timeEnd} ngày</div>
                          </td>
                        </tr>
                      )
                    }
                  })
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
      {yearShow}
      <div className="w-full flex gap-y-4 lg:flex-nowrap lg:gap-4 xl:flex-nowrap flex-wrap">
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <PieChart dataRoomStatus={roomStatisticals} />
        </div>
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <BarPayment dataPayment={totalMoneys} />
        </div>
      </div>
      <div className="w-full flex gap-y-4 lg:flex-nowrap lg:gap-4 xl:flex-nowrap flex-wrap">
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <BarDien data={totalElictic} />
        </div>
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <BarNuoc dataNuoc={totalWater} />
        </div>
      </div>
    </div>
  );
};

export default HomeManagerPage;

import BarChart from '@/components/chart/Bar';
import { PieChart } from '@/components/chart/Pie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { faChartSimple, faHouse, faPerson } from '@fortawesome/free-solid-svg-icons';
import { getAllBillServiceByYear, getAllStatusRooms } from 'src/pages/api/statistical';
import BarDien from '@/components/chart/barDien';

const HomeManagerPage = () => {
  const [roomStatisticals, setRoomStatisticals] = useState<any>([]);
  const [totalWater, setTotalWater] = useState<any>([]);
  const [totalElictic, setTotalElictric] = useState<any>([]);
  const [checkYear, setCheckYear] = useState(new Date().getFullYear());
  const router = useRouter();
  const { id } = router.query;
  const yearStatistical = new Date().getFullYear();
  var years = Array.from(new Array(20), (val, index) => yearStatistical - index);
  const checkNameNuoc = 'nuoc';
  const checkNameDien = 'dien';

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
          className="mt-2 shadow appearance-none border rounded w-[10%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            setRoomStatisticals(data as any);
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
      }
    }
  }, [id, checkYear, checkNameDien]);

  var totalRooms = roomStatisticals.roomNotReady + roomStatisticals.roomReadyEmpty + roomStatisticals.roomReadyUsing;

  return (
    <div className="w-full gap-4 flex flex-col ">
      <header className="bg-white shadow border rounded-md">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Bảng thống kê
              </h2>
            </div>
          </div>
        </div>
      </header>
      {totalRooms != 0 && (
        <div className="w-full flex">
          <div className="grid grid-rows-2 p-2 grid-cols-2 flex-[50%]  xl:flex-nowrap flex-wrap lg:gap-3 sm:gap-2 md:gap-2 gap-y-2 md:gap-y-2 justify-between">
            <div className="flex flex-wrap justify-between items-center lg:p-5 md:p-[4px] sm:p-5  bg-white shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Tổng số phòng</p>
                  <h5 className="mb-0">{totalRooms} phòng</h5>
                </div>
              </div>
              <div className="max-w-full ">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faHouse} />
                </div>
              </div>
            </div>
            <div className="flex-[25%] flex flex-wrap justify-between items-center lg:p-5 md:p-[4px] sm:p-5  bg-white shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Phòng đang sửa</p>
                  <h5 className="mb-0">{roomStatisticals.roomNotReady} phòng</h5>
                </div>
              </div>
              <div className="max-w-full ">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faChartSimple} />
                </div>
              </div>
            </div>

            <div className="flex-[25%] flex flex-wrap justify-between items-center lg:p-5 md:p-[4px] sm:p-5  bg-white shadow border rounded-md">
              <div className="max-w-full ">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Phòng đang sử dụng</p>
                  <h5 className="mb-0">{roomStatisticals.roomReadyUsing} phòng</h5>
                </div>
              </div>
              <div className="max-w-full">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faHouse} />
                </div>
              </div>
            </div>
            <div className="flex-[25%] flex flex-wrap justify-between items-center lg:p-5 md:p-[4px] sm:p-5  bg-white shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Người thuê phòng</p>
                  <h5 className="mb-0">{roomStatisticals.numberMemberInHouse} người</h5>
                </div>
              </div>
              <div className="max-w-full ">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faPerson} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[50%] md:max-w-[50%] p-2">
            <div className="w-full lg:w-[100%]  bg-white shadow border rounded-md p-2">
              <PieChart dataRoomStatus={roomStatisticals} />
            </div>
          </div>
        </div>
      )}
      {totalRooms == 0 && (
        <div className="w-full">
          <div className="flex flex-[100%] xl:flex-nowrap flex-wrap lg:gap-5 sm:gap-2 md:gap-0 gap-y-2 md:gap-y-2 justify-between">
            <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-white shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Tổng số</p>
                  <h5 className="mb-0">0 phòng</h5>
                </div>
              </div>
              <div className="max-w-full ">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faHouse} />
                </div>
              </div>
            </div>
            <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-white shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Người thuê phòng</p>
                  <h5 className="mb-0">0 người</h5>
                </div>
              </div>
              <div className="max-w-full ">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faPerson} />
                </div>
              </div>
            </div>
            <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-white shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Phòng đang sử dụng</p>
                  <h5 className="mb-0">0 phòng</h5>
                </div>
              </div>
              <div className="max-w-full ">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faHouse} />
                </div>
              </div>
            </div>
            <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-white shadow border rounded-md">
              <div className="max-w-full">
                <div>
                  <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Phòng đang sửa chữa</p>
                  <h5 className="mb-0">0 phòng</h5>
                </div>
              </div>
              <div className="max-w-full ">
                <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                  <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faChartSimple} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {yearShow}
      <div className="w-full flex gap-y-4 lg:flex-nowrap lg:gap-4 xl:flex-nowrap flex-wrap">
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <BarChart data={totalWater} />
        </div>
        <div className="w-[100%] lg:w-[50%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <BarDien data={totalElictic} />
        </div>
      </div>
    </div>
  );
};

export default HomeManagerPage;

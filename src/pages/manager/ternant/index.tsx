import BarChart from '@/components/chart/Bar';
import React, { useEffect, useState } from 'react';
import { getBillServiceByYear, getDetailBillServiceByMonthYear } from 'src/pages/api/statistical';
import BarDien from '@/components/chart/barDien';
import { useUserContext } from '@/context/UserContext';

const Ternant = () => {
  const [roomStatisticals, setRoomStatisticals] = useState<any>([]);
  const [totalWater, setTotalWater] = useState<any>([]);
  const [totalElictic, setTotalElictric] = useState<any>([]);
  const [totalElicticDetail, setTotalElictricDetail] = useState<any>([]);
  const [checkYear, setCheckYear] = useState(new Date().getFullYear());

  const [codeRoom, setCodeRoom] = useState<any>();
  const { cookies } = useUserContext();
  useEffect(() => {
    const data = cookies?.code_room;
    setCodeRoom(data as any);
  }, [cookies?.code_room]);

  const yearStatistical = new Date().getFullYear();
  var years = Array.from(new Array(20), (val, index) => yearStatistical - index);
  const checkNameNuoc = 'nuoc';
  const checkNameDien = 'dien';

  const YearShow = React.useMemo(() => {
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
  }, [years]);

  useEffect(() => {
    if (checkYear && codeRoom?._id) {
      const getTotalWater = async () => {
        try {
          const { data } = await getBillServiceByYear(codeRoom?._id, checkNameNuoc, checkYear)
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
          const { data } = await getBillServiceByYear(codeRoom?._id, checkNameDien, checkYear)
          if (data.data) {
            setTotalElictric(data.data as any);
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      getTotalElictric();

      const getTotalElictricDetail = async () => {
        try {
          const { data } = await getDetailBillServiceByMonthYear(codeRoom?._id, checkNameDien, 7, checkYear)
          if (data.data) {
            setTotalElictricDetail(data.data as any);
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      getTotalElictricDetail();

    }
  }, [codeRoom?._id, checkYear, checkNameDien]);

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
      {YearShow}
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

export default Ternant;
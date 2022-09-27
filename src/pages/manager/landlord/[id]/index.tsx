import BarChart from '@/components/chart/Bar';
import { PieChart } from '@/components/chart/Pie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const HomeManagerPage = () => {
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
      <div className="w-full">
        <div className="flex flex-[100%] xl:flex-nowrap flex-wrap lg:gap-5 sm:gap-2 md:gap-0">
          <div className="flex-[100%] sm:flex-[50%] lg:flex-[25%] xl:flex-[25%] flex flex-wrap justify-between items-center p-5 bg-white shadow border rounded-md">
            <div className="max-w-full">
              <div>
                <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Phòng</p>
                <h5 className="mb-0">1</h5>
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
                <h5 className="mb-0">1 người</h5>
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
                <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Phòng</p>
                <h5 className="mb-0">1</h5>
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
                <p className="mb-0 font-sans font-bold leading-normal text-sm dark:opacity-60">Doanh thu cả năm</p>
                <h5 className="mb-0">1 Đ</h5>
              </div>
            </div>
            <div className="max-w-full ">
              <div className="flex items-center w-[40px] h-[40px]  text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                <FontAwesomeIcon className="w-[20px] mx-auto text-white" icon={faHouse} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex lg:gap-4 xl:flex-nowrap flex-wrap">
        <div className="w-[100%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <BarChart />
        </div>
        <div className="w-[100%] xl:w-[50%] bg-white shadow border rounded-md p-2">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default HomeManagerPage;

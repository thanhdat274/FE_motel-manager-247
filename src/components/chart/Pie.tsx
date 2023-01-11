import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống kê phòng',
      font: {
        size: 24
      }
    },
  },
};

export function PieChart(dataRoomStatus: any) {
  const dataRoom = dataRoomStatus.dataRoomStatus
  const dataPie = {
    labels: ['Phòng chưa có người ở', 'Phòng dang sử dụng', 'Phòng đang sửa chữa'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          dataRoom?.roomReadyEmpty?.count,
          dataRoom?.roomReadyUsing
            ?.count,
          dataRoom?.roomNotReady?.count,
        ],
        backgroundColor: ['rgb(254,240,138)', 'rgb(134,239,172)', 'rgb(252,165,165)'],
        borderColor: ['rgb(254,240,138)', 'rgb(134,239,172)', 'rgb(252,165,165)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="block xl:w-[400px] mx-auto sm:max-w-[70%]">
      <Pie options={options} data={dataPie} />
    </div>
  );
}

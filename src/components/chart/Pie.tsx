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
    },
  },
};

export function PieChart(dataRoomStatus: any) {
  const dataPie = {
    labels: ['Phòng trống', 'Đang sử dụng', 'Phòng chưa đưa vào sử dụng'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          dataRoomStatus.dataRoomStatus.roomReadyEmpty,
          dataRoomStatus.dataRoomStatus.roomReadyUsing,
          dataRoomStatus.dataRoomStatus.roomNotReady,
        ],
        backgroundColor: ['rgba(255, 147, 150, 1)', 'rgba(0, 255, 148, 0.5)', 'yellow'],
        borderColor: ['rgba(255, 147, 150, 1)', 'rgba(0, 255, 148, 0.5)', 'yellow'],
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

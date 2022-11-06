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
    labels: ['Đang sử dụng', 'Phòng trống', 'Phòng chưa đưa vào sử dụng'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          dataRoomStatus.dataRoomStatus.roomReadyUsing,
          dataRoomStatus.dataRoomStatus.roomReadyEmpty,
          dataRoomStatus.dataRoomStatus.roomNotReady,
        ],
        backgroundColor: ['rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 30, 0.2)', 'rgba(0, 81, 255, 0.2)'],
        borderColor: ['rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 30, 0.2)', 'rgba(0, 81, 255, 0.2)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="block xl:w-[400px] mx-auto">
      <Pie options={options} data={dataPie} />
    </div>
  );
}

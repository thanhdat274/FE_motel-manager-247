import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useRouter } from 'next/router';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Doanh thu hàng tháng',
    },
  },
};

const labels = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

const BarPayment = (dataPayment: any) => {
  const router = useRouter();
  const { id } = router.query;
  if (id) {
    var data = {
      labels,
      datasets: [
        
        {
          label: 'Số tiền đã thu',
          data: dataPayment.dataPayment.fullPayment,
          backgroundColor: 'rgb(153, 255, 153)',
          borderWidth: 1,
        },
        {
          label: 'Tổng số tiền',
          data: dataPayment.dataPayment.allPayment,
          backgroundColor: 'rgb(255, 153, 153)',
          borderWidth: 1,
        },
      ],
    };
  }
  else {
    var data = {
      labels,
      datasets: [
        {
          label: 'Số điện',
          data: dataPayment.dataPayment.allPayment,
          backgroundColor: 'rgb(153, 255, 153)',
          borderWidth: 1,
        },
        {
          label: 'Số nước',
          data: dataPayment.dataPayment.fullPayment,
          backgroundColor: 'rgb(255, 153, 153)',
          borderWidth: 1,
        }
      ],
    };
  }

  return (
    <div className="block h-[300px] lg:h-[400px]">
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarPayment;


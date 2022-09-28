import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

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

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [20, 10, 3, 8, 3, 5, 6, 33, 44, 55, 66, 3],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderWidth: 1,
    },
  ],
};

const BarChart = () => {
  return (
    <div className='block h-[300px] lg:h-[400px]'>
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChart;

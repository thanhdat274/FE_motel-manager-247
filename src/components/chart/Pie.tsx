import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useRouter } from 'next/router';
import { listRoom } from 'src/pages/api/room';

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

export const data = {
  labels: ['Phòng trống', 'Phòng đã thuê'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  const [dataRooms, setDataRooms] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // const [fillter, setfillter] = useState('');
  // const handleSearch = (event: any) => {
  //   const value = event.target.value;
  //   setfillter(value);
  // };

  useEffect(() => {
    const getRoom = async () => {
      try {
        const { data } = await listRoom(id);
        if (data.data) {
          setDataRooms(data.data as any);
        }
      } catch (error) {}
    };
    getRoom();
  }, [id]);
  console.log(dataRooms);
  console.log(1);
  
  

  return (
    <div className="block xl:w-[400px] mx-auto">
      <Pie options={options} data={data} />
    </div>
  );
}

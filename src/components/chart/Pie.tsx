import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useRouter } from 'next/router';
import { listRoom } from 'src/pages/api/room';
import { useUserContext } from '@/context/UserContext';
import { useParams } from 'react-router-dom';
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

export function PieChart() {
  var i = 0;
  var y = 0;
  const { cookies, setLoading } = useUserContext();
  const [dataRooms, setDataRooms] = useState<any>([]);
  const router = useRouter();
  const userData = cookies?.user;
  const { id } = router.query;

  useEffect(() => {
    const getRoom = async () => {
      try {
        const { data } = await listRoom(id, userData as any);
        if (data.data) {
          setDataRooms(data.data as any);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getRoom();
  }, [id]);

  for (var i = 0; i < dataRooms.length; i++) {
    console.log(dataRooms[i].status);
  }

  const dataPie = {
    labels: ['Phòng trống', 'Phòng đã thuê'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, dataRooms.length],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
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

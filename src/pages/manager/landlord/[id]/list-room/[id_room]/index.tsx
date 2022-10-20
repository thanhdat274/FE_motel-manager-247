import { IMember } from '@/components/ListMember';
import TabPanelComponent from '@/components/TabPanel';
import TenantContract from '@/components/TenantContact';
import TenantMember from '@/components/TenantMember';
import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { readRoom } from 'src/pages/api/room';

const TenantInformation = dynamic(() => import('@/components/TenantInfo'), { ssr: false });

type Props = {};

const ManageRoom = () => {
  const [roomData, setRoomData] = useState({});
  const [peopleData, setPeopleData] = useState({});
  const { cookies, setLoading } = useUserContext();
  const a = cookies?.user;
  const router = useRouter();

  const getRoom = async () => {
    setLoading(true);

    try {
      const { data } = await readRoom(`${param.id_room}`, a as any);
      if (data.data) {
        setRoomData(data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //console.log(error);
    }
  };

  // api people

  const getPeople = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://633505ceea0de5318a0bacba.mockapi.io/api/house/${param.id}/room/${param.id_room}/people`,
      );
      if (res.data) {
        setPeopleData(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const param = router.query;
  console.log(param);

  useEffect(() => {
    if (param.id) {
      getRoom();
    }
    getPeople();
  }, [param.id]);

  const data = [
    {
      label: 'Thông tin phòng trọ',
      value: 0,
      children: <TenantInformation data={roomData} />,
    },
    {
      label: 'Thành viên',
      value: 1,
      children: <TenantMember data={peopleData as IMember[]} data1={roomData} />,
    },

    {
      label: 'Hợp đồng',
      value: 2,
      children: <TenantContract />,
    },
  ];

  return (
    <div className="container">
      <div className="title w-full p-4 bg-white rounded-sm shadow-lg mb-4">Quản lý phòng trọ</div>
      <div className="manage-room-container ">
        <TabPanelComponent data={data} />
      </div>
    </div>
  );
};

export default ManageRoom;

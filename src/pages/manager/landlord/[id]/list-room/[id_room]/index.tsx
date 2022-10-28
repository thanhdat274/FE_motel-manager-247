import TabPanelComponent from '@/components/TabPanel';
import TenantContract from '@/components/TenantContact';
import TenantMember from '@/components/TenantMember';
import { useUserContext } from '@/context/UserContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Toast } from 'src/hooks/toast';
import { getInfoUser } from 'src/pages/api/auth';
import { readRoom } from 'src/pages/api/room';

const TenantInformation = dynamic(() => import('@/components/TenantInfo'), { ssr: false });

const ManageRoom = () => {
  const [roomData, setRoomData] = useState<any>({});
  const { cookies, setLoading } = useUserContext();
  const [infoLanlord, setInfoLanlord] = useState();
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;

  const getInfoLandlord = async () => {
    setLoading(true);
    await getInfoUser(userData.user._id, userData.token)
      .then((result) => {
        setInfoLanlord(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        Toast('error', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userData) {
      getInfoLandlord();
    }
  }, []);

  useEffect(() => {
    if (param.id) {
      const getRoom = async () => {
        setLoading(true);
        try {
          const { data } = await readRoom(`${param.id_room}`, userData as any);
          if (data.data) {
            setRoomData(data.data);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      };
      getRoom();
    }
  }, [param.id, param.id_room, setLoading, userData]);

  const data = [
    {
      label: 'Thông tin phòng trọ',
      value: 0,
      children: <TenantInformation data={roomData} />,
    },
    {
      label: 'Thành viên',
      value: 1,
      children: <TenantMember data={roomData} data1={roomData.listMember} />,
    },
    {
      label: 'Hợp đồng',
      value: 2,
      children: (
        <TenantContract
          dataContract={roomData.contract}
          leadMember={
            roomData?.listMember?.length > 0
              ? roomData?.listMember.find((element: any) => element.status == true)
              : null
          }
          dataLanlord={infoLanlord}
        />
      ),
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

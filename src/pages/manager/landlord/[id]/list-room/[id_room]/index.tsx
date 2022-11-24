import LoginCode from '@/components/LoginCode';
import TabPanelComponent from '@/components/TabPanel';
import TenantContract from '@/components/TenantContact';
import TenantMember from '@/components/TenantMember';
import { useUserContext } from '@/context/UserContext';
import { message } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Toast } from 'src/hooks/toast';
import { getInfoUser } from 'src/pages/api/auth';
import { addPeople, readRoom } from 'src/pages/api/room';

const TenantInformation = dynamic(() => import('@/components/TenantInfo'), { ssr: false });

const ManageRoom = () => {
  const [roomData, setRoomData] = useState<any>({});
  const { cookies, setLoading } = useUserContext();
  const [infoLandlord, setInfoLandlord] = useState();
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;




  const getInfoLandlord = async () => {
    setLoading(true);
    await getInfoUser(userData.user._id, userData.token)
      .then((result) => {
        setInfoLandlord(result.data.data);
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
    // LoginCode
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
          roomArea={roomData.area}
          roomPrice={roomData.price}
          dataLandlord={infoLandlord}
        />
      ),
    },
    {
      label: 'Mã đăng nhập',
      value: 3,
      children: <LoginCode data={roomData} />,
    },
  ];

  return (
    <div className="w-full">
      <header className="bg-white shadow border rounded-md">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
              quản lý phòng trọ
              </h2>
            </div>
          </div>
        </div>
      </header>
      <div className="manage-room-container ">
        <TabPanelComponent data={data} />
      </div>
    </div>
  );
};

export default ManageRoom;

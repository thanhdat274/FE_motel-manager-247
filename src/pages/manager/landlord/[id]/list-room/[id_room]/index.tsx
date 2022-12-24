import LoginCode from '@/components/LoginCode';
import TabPanelComponent from '@/components/TabPanel';
import TenantContract from '@/components/TenantContact';
import TabService from '@/components/TabService';
import TenantMember from '@/components/TenantMember';
import { useUserContext } from '@/context/UserContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Toast } from 'src/hooks/toast';
import { getInfoUser } from 'src/pages/api/auth';
import { readRoom } from 'src/pages/api/room';
import { ListService } from 'src/pages/api/service';

const TenantInformation = dynamic(() => import('@/components/TenantInfo'), { ssr: false });

const ManageRoom = () => {
  const [roomData, setRoomData] = useState<any>({});
  const { cookies, setLoading } = useUserContext();
  const [setFirstTab, setSetFirstTab] = useState(0);
  const [infoLandlord, setInfoLandlord] = useState();
  const [resetPage, setResetPage] = useState(0);
  const [listServices, setListServices] = useState([]);
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;
  const { id } = router.query;

  const handleResetPage = () => {
    setResetPage(resetPage + 1);
  };

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
  }, [param.id, param.id_room, setLoading, userData, setFirstTab, resetPage]);

  useEffect(() => {
    if (id) {
      const getService = async () => {
        try {
          const { data } = await ListService(id as string, userData as any);
          setListServices(data.data);
        } catch (error) {
          setLoading(false);
        }
      };
      getService();
    }
  }, [id, setLoading, userData]);
  const setDataFromChild = (number: number) => {
    setSetFirstTab(number);
  };

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
      children: <TenantMember data={roomData} data1={roomData.listMember} handleResetPage={() => handleResetPage()} />,
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
          setSetFirstTab={(value: number) => setDataFromChild(value)}
        />
      ),
    },
    {
      label: 'Mã đăng nhập',
      value: 3,
      children: <LoginCode data={roomData} handleResetPage={() => handleResetPage()} />,
    },
    {
      label: 'Dịch vụ',
      value: 4,
      children: (
        <TabService
          data={listServices}
          id={id}
          idRoom={param.id_room}
          userData={userData}
          dataRoom={roomData}
          setSetFirstTab={(value: number) => setDataFromChild(value)}
        />
      ),
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
        <TabPanelComponent data={data} valueInit={setFirstTab} />
      </div>
    </div>
  );
};

export default ManageRoom;

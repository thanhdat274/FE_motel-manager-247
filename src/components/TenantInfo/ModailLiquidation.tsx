import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal';
import { Toast } from 'src/hooks/toast';
import { readRoom } from 'src/pages/api/room';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { getInfoUser } from 'src/pages/api/auth';
import { ListService } from 'src/pages/api/service';
import TabPanelComponent from '@/components/TabPanel';
import TenantMember from '@/components/TenantMember';

type Props = {
  open: boolean;
  onCloseModal: () => void;
  setOpen: (data: boolean) => void;
};

const ModailLiquidation = ({ open, onCloseModal, setOpen }: Props) => {
  const [roomData, setRoomData] = useState<any>({});
  const { cookies, setLoading } = useUserContext();
  const [setFirstTab, setSetFirstTab] = useState(0);
  const [resetPage, setResetPage] = useState(0);
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;
  const { id } = router.query;

  const handleResetPage = () => {
    setResetPage(resetPage + 1);
  };

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

  const setDataFromChild = (number: number) => {
    setSetFirstTab(number);
  };

  const data = [
    {
      label: 'Thành viên',
      value: 1,
      children: <TenantMember data={roomData} data1={roomData.listMember} handleResetPage={() => handleResetPage()} />,
    },
    {
      label: 'Hóa đơn',
      value: 2,
      children: <TenantMember data={roomData} data1={roomData.listMember} handleResetPage={() => handleResetPage()} />,
    },
    {
      label: 'Hợp đồng',
      value: 3,
      // children: (
      //   <TenantContract
      //     data={roomData}
      //     dataContract={roomData.contract}
      //     leadMember={
      //       roomData?.listMember?.length > 0
      //         ? roomData?.listMember.find((element: any) => element.status == true)
      //         : null
      //     }
      //     roomArea={roomData.area}
      //     roomPrice={roomData.price}
      //     dataLandlord={infoLandlord}
      //     setSetFirstTab={(value: number) => setDataFromChild(value)}
      //   />
      // ),
    },
  ];
  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>

        <div className="manage-room-container ">
          <TabPanelComponent data={data} valueInit={setFirstTab} />
        </div>
      </Modal>
    </div>
  )
}

export default ModailLiquidation
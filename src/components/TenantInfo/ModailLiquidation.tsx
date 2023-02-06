import React, { useEffect, useState } from 'react'
import { liquiBill, readRoom } from 'src/pages/api/room';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import TabPanelComponent from '@/components/TabPanel';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import LiquidationBill from './LiquidationBill';
import Member from './Member';
import Contact from './Contact';
import { createBillLiquidation } from 'src/pages/api/bill';
import { Toast } from 'src/hooks/toast';
import Deposit from './Deposit';

type Props = {
  open: boolean;
  onCloseModal: () => void;
  setOpen: (data: boolean) => void;
  resetDataLiquid: () => void;
};

const ModailLiquidation = ({ open, onCloseModal, setOpen, resetDataLiquid }: Props) => {
  const [roomData, setRoomData] = useState<any>({});
  const [liquidationBill, setLiquidationBill] = useState<any>({});
  const { cookies, setLoading } = useUserContext();
  const [setFirstTab, setSetFirstTab] = useState(0);
  const [resetPage, setResetPage] = useState(0);
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;

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

  useEffect(() => {
    const getRoom1 = async () => {
      setLoading(true);
      const { data } = await liquiBill({ idRoom: param?.id_room, idHouse: param?.id }, userData?.token)
      setLiquidationBill(data)
    };
    getRoom1();
  }, [param?.id, param?.id_room, setFirstTab]);

  const setDataFromChild = (number: number) => {
    setSetFirstTab(number);
  };
  const onSubmit = async () => {
    const data = { idRoom: param?.id_room, idHouse: param?.id, invoiceService: liquidationBill, listMember: roomData?.listMember, contract: roomData?.contract?.imageContract, idAuth: userData?.user?._id, deposit: roomData?.contract?.infoTenant?.deposit };
    setLoading(true);
    await createBillLiquidation(data)
      .then((result) => {
        setLoading(false);
        Toast('success', result?.data?.message);
        setOpen(false);
        resetDataLiquid()
      })
      .catch((error) => {
        Toast('error', error?.response?.data?.message);
        setLoading(false);
      })
  }

  const data = [
    {
      label: 'Hóa đơn',
      value: 0,
      children: (<LiquidationBill data={liquidationBill} dataContract={roomData.contract} handleResetPage={() => handleResetPage()} />),
    },
    {
      label: 'Tiền cọc',
      value: 1,
      children: (<Deposit dataContract={roomData.contract} handleResetPage={() => handleResetPage()} />),
    },
    {
      label: 'Thành viên',
      value: 2,
      children: <Member data={roomData} data1={roomData.listMember} handleResetPage={() => handleResetPage()} />,
    },
    {
      label: 'Hợp đồng',
      value: 3,
      children: (
        <Contact
          data={roomData}
          dataContract={roomData.contract}
          handleResetPage={() => handleResetPage()}
        />
      ),
    },
  ];
  return (
    <div>
      <Modal open={open} onCancel={onCloseModal} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }}>
        <div className="manage-room-container">
          <TabPanelComponent data={data} valueInit={setFirstTab} />
          <button onClick={() => onSubmit()} className="flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Thanh lý</button>
        </div>
      </Modal>
    </div>
  )
}

export default ModailLiquidation
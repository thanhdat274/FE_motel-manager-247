import TabPanelComponent from '@/components/TabPanel'
import { useUserContext } from '@/context/UserContext';
import { Modal } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import BillLiqui from './BillLiqui';
import 'antd/dist/antd.css';
import DetailDeposit from './DetailDeposit';
import DetailMember from './DetailMember';
import DetailContact from './DetailContact';
type Props = {
  open: boolean;
  onCloseModal: () => void;
  setOpen: (data: boolean) => void;
  detailBill: any
};
const ModalDeatil = ({ open, onCloseModal, setOpen, detailBill }: Props) => {
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
  const setDataFromChild = (number: number) => {
    setSetFirstTab(number);
  };
  const data = [
    {
      label: 'Hóa đơn',
      value: 0,
      children: (<BillLiqui data={detailBill} />),
    },
    {
      label: 'Tiền cọc',
      value: 1,
      children: (<DetailDeposit data={detailBill} />),
    },
    {
      label: 'Thành viên',
      value: 2,
      children: <DetailMember data={detailBill} />,
    },
    {
      label: 'Hợp đồng',
      value: 3,
      children: (
        <DetailContact
          data={detailBill}
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
        </div>
      </Modal>
    </div>
  )
}

export default ModalDeatil
import TabPanelComponent from '@/components/TabPanel';
import TenantContract from '@/components/TenantContact';
import TenantInformation from '@/components/tenantInfo';
import TenantMember from '@/components/TenantMember';
import React from 'react';

type Props = {};

const data = [
  {
    label: 'Thông tin khách thuê nhà',
    value: 0,
    children: <TenantInformation />,
  },
  {
    label: 'Thành viên',
    value: 1,
    children: <TenantMember />,
  },

  {
    label: 'Hợp đồng',
    value: 2,
    children: <TenantContract />,
  },
];

const ManageRoom = () => {
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

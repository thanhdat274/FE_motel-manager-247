import TabHistoryComponent from '@/components/TabHistory'
import React, { useState } from 'react'

type Props = {}

const HistoryDelete = (props: Props) => {
    const [setFirstTab, setSetFirstTab] = useState(0);
    const data = [
        {
          label: 'Thông tin phòng trọ',
          value: 0,
          children:'',
        },
        // LoginCode
        {
          label: 'Thành viên',
          value: 1,
          children:'',
        },
        {
          label: 'Hợp đồng',
          value: 2,
          children:''
        },
        {
          label: 'Dịch vụ',
          value: 4,
          children: ''
           
        },
        {
          label: 'Hoá đơn',
          value: 4,
          children: ''
           
        },
      ];
  return (
    <div className="w-full">
    <header className="bg-white shadow border rounded-md">
      <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
              quản lý lịch sử
            </h2>
          </div>
        </div>
      </div>
    </header>
    <div className="manage-room-container ">
    <TabHistoryComponent data={data} valueInit={setFirstTab} />
    </div>
  </div>
  )
}

export default HistoryDelete
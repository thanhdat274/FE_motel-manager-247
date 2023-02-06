

import TabHistoryComponent from '@/components/TabHistory'
import TabPeople from '@/components/TabPeople';
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { historyDelete } from 'src/pages/api/history';
import TabServiceHistory from '@/components/TabServiceHistory';
import TabBillHistory from '@/components/TabBillHistory';
import TabBillServiceHistory from '@/components/TabBillServiceHistory';
// import React, { useEffect, useState } from 'react'

type Props = {}

const HistoryDelete = (props: Props) => {
  const [setFirstTab, setSetFirstTab] = useState(0);



  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;
  const id = param.id;
  const [history, setHistory] = useState([])
  var historyReverse = [...history].reverse();
  
  

  useEffect(() => {
    setLoading(true)
    if (id) {
      const getHistory = async () => {
        const { data } = await historyDelete(id, userData)
        setHistory(data.data)
        setLoading(false)

      }
      getHistory()
    }

  }, [id])

  const data = [
    {
      label: 'Thông tin phòng trọ',
      value: 0,
      children: <TabPeople data= {historyReverse} />,
    },
  
    {
      label: 'Điện nước',
      value: 2,
      children: <TabBillServiceHistory data= {historyReverse}/>
    },
    {
      label: 'Dịch vụ',
      value: 4,
      children:<TabServiceHistory data= {historyReverse}/>

    },
    {
      label: 'Hoá đơn',
      value: 4,
      children: <TabBillHistory data= {historyReverse}/>

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
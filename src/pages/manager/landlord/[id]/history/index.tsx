
import { useUserContext } from '@/context/UserContext';
import { Table } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { historyDelete } from 'src/pages/api/history';
import 'antd/dist/antd.css';

const { Column, ColumnGroup } = Table;
type Props = {}

const HistoryDelete = (props: Props) => {
  

  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const router = useRouter();
  const param = router.query;
  const id = param.id;
  const [history, setHistory] = useState([])
  var historyReverse = [...history].reverse();
  const hist = 
  
  

  useEffect(() => {
    if (id) {
      const getHistory = async () => {
        const { data } = await historyDelete(id, userData)
        setHistory(data.data)
      }
      getHistory()
    }

  }, [id])

  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Lịch sử
              </h2>
            </div>

          </div>
        </div>
      </header>
      <main>
        <div className="mt-10">
          <Table
            dataSource={historyReverse?.map((item: { _id: any; roomName: any; content: any; createdAt: moment.MomentInput}, index: number) => ({
              index: index + 1,
              content:  item.content,
              date: moment(item.createdAt).format('DD/MM/YYYY'),
            }))}
            pagination={{ pageSize: 6 }}
          >
            <Column title="STT" dataIndex="index" key="name" />
            <Column title="Nội dung"  dataIndex="content" key="contents" width={500} render={(content)  =>{
              return(
                  <div dangerouslySetInnerHTML={{__html: content}}></div>
              )
            }} />
            <Column title="Ngày xóa" dataIndex="date" key="date"  />

          </Table>

        </div >
      </main>
    </div>
  )
}

export default HistoryDelete
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { getBillLiquidation } from 'src/pages/api/bill';

type Props = {}

const LiquidationBill = (props: Props) => {
  const router = useRouter();
  const param = router.query;
  const { cookies, setLoading } = useUserContext();
  const userData = cookies?.user;
  const [listBillLiqui, setListBillLiqui] = useState<any>([])

  useEffect(() => {
    if (param?.id) {
      const getBillLiqui = async () => {
        setLoading(true);
        try {
          const { data } = await getBillLiquidation(param?.id as string)
          if (data) {
            setListBillLiqui(data.data)
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }

      }
      getBillLiqui()
    }
  }, [param?.id, setLoading])
  console.log(listBillLiqui)
  return (
    <div className="h-screen">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Quản lý hóa đơn thanh lý hợp đồng
              </h2>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full ">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          STT
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tên
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Giá
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Đơn vị
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Trạng thái sử dụng
                        </th>
                        <th
                          scope="col"
                          className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listBillLiqui &&
                        listBillLiqui?.map((item: any, index: any) => {
                          return (
                            <tr key={index}>
                              <td className="px-9 py-4 whitespace text-sm text-gray-500">
                                <div className="text-center">{index + 1}</div>
                              </td>
                              <td className="px-6 py-4 whitespace">
                                <div className="text-center">{item.detailRoom.listMember.memberName}</div>
                              </td>
                              

                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
    </div >
  )
}

export default LiquidationBill
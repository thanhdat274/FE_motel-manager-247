import React from 'react'
import { Table } from 'antd';
import 'antd/dist/antd.css';
export type IMember2 = {
  _id: string;
  id: string;
  name: string;
  status: boolean;
  maxMember: number;
  price: number;
  area: number;
  listMember: object;
};
type Props = {
  data: IMember2;
  data1: any;
  handleResetPage: () => void
};
const Member = ({ data, data1 }: Props) => {
  console.log("data hóa đơn1", data1);
  const dataa: any[] = data1?.map((item: any, index: any) => {

    return {
      index: index + 1,
      key: item._id,
      memberName: item.memberName,
      cardNumber: item.cardNumber,
      phoneNumber: item.phoneNumber,
      status: item.status ? 'Chủ phòng' : 'thành viên'
    }
  });
  const columns: any[] = [
    {
      title: 'Tên thành viên',
      dataIndex: 'memberName',
      key: 'memberName',
      width: '25%',
    },
    {
      title: 'CMND/CCCD',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: '25%',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '25%',
    },
    {
      title: 'Chức vụ trong phòng',
      dataIndex: 'status',
      key: 'status',
      width: '25%',
    },
  ]
  return (
    <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table dataSource={dataa} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Member
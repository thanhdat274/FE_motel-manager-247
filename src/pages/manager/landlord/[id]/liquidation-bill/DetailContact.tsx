import React from 'react'
import { Image } from 'antd';
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
export type IContractData = {
  addressCT: string;
  timeCT: string;
  startTime: string;
  endTime: string;
  additional: any;
  fine: number;
  imageContract: any;
  detailRoom:any
};
type Props = {
  data: IContractData;
  handleResetPage: () => void
};
const DetailContact = ({ data }: Props) => {
  const arrImage = data?.detailRoom?.contract?.imageContract
  return (
    <div>
      {arrImage?.length ? (
        <div className='flex gap-2 flex-wrap justify-around'>
          {arrImage?.map((item: any, index: number) => {
            return (
              <div key={index} className="">
                <Image style={{ width: '150px' }} src={item} alt='' />
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          <h2 className='uppercase text-2xl'>Không có ảnh hợp đồng</h2>
        </div>
      )}
    </div>
  )
}

export default DetailContact
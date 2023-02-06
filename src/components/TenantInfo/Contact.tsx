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
};
type Props = {
  data: IMember2;
  dataContract: IContractData;
  handleResetPage: () => void
};
const Contact = ({ data, dataContract }: Props) => {
  const arrImage = dataContract?.imageContract
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

export default Contact
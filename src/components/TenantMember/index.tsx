import dynamic from 'next/dynamic';
import React from 'react';
import { IMember } from '../ListMember';
const ListMember = dynamic(() => import('@/components/ListMember'), { ssr: false });

type IProps = {
  data: IMember[];
};

const TenantMember = ({ data }: IProps) => {
  console.log('data', data);

  return (
    <div className="flex flex-row flex-wrap w-full gap-4">
      {data.length > 0 ? (
        data?.map((item: IMember) => (
          <div key={item.name} className=" basis-full md:basis-[30%] ">
            <ListMember {...item} />
          </div>
        ))
      ) : (
        <div>Chưa có thành viên nào</div>
      )}
    </div>
  );
};

export default TenantMember;

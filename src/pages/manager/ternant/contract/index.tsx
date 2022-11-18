import React, { useState, useEffect } from 'react';
import { Image } from 'antd';
import 'antd/dist/antd.css';
import { useUserContext } from '@/context/UserContext';

type Props = {};

const ContractTernant = (props: Props) => {
  const [codeRoom, setCodeRoom] = useState<any>();
  const { cookies } = useUserContext();
  
  useEffect(() => {
    const  data  = cookies?.code_room;
    setCodeRoom(data as any);
  }, [cookies?.code_room]);
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Hình ảnh hợp đồng
              </h2>
            </div>
          </div>
        </div>
      </header>
      <main className='text-center mt-10'>
        {codeRoom?.contract?.imageContract ? (
          <div>
            <Image style={{ width: '500px' }} src={codeRoom?.contract?.imageContract} />
        </div>
        ) : (
          <div>
            <h2 className='uppercase text-2xl'>Không có ảnh hợp đồng</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContractTernant;
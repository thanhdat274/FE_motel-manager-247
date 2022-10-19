import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import { useUserContext } from '@/context/UserContext';
import { listContract } from 'src/pages/api/contract';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

type Props = {};

const ContractForm = (props: Props) => {
  const ReactQuill = dynamic(import('react-quill'), { ssr: false });
  const [contract1, setContract] = useState([]);
  const { setLoading } = useUserContext();

  const router = useRouter();
  const param = router.query;

  useEffect(() => {
    setLoading(true);
    const getContract = async () => {
      const { data } = await listContract();
      setContract(data.data as any);
      setLoading(false);
    };
    getContract();
  }, []);

  return (
    <div>
      <p className=" mb-5 mt-5">
        <Link href={`/manager/landlord/${param.id}/contract-form/add`}>
          <a className="bg-cyan-400 text-white rounded-md px-5 py-3  mb-5 hover:bg-cyan-500">Thêm hợp đồng</a>
        </Link>
      </p>

      <div className="">
        <Slide>
          {contract1?.map((item: any, index: React.Key | null | undefined) => {
            //console.log(item);
            return (
              <>
                <div className="m-5  ">
                  <div className=" snap-start ">
                    <h1 key={index} className="text-xl font-bold =">
                      {item?.title}
                    </h1>
                    <ReactQuill value={item?.content} readOnly={true} theme={'bubble'} className="border mt-5" />
                  </div>
                </div>
              </>
            );
          })}
        </Slide>
      </div>
    </div>
  );
};

export default ContractForm;

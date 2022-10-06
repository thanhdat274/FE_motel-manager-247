import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import { useUserContext } from '@/context/UserContext';
type Props = {};

const ContractForm = (props: Props) => {
  
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
  const [contract1, setContract] = useState([]);
  const { setLoading } = useUserContext();

  // console.log(contract1);
  const router = useRouter();
  const param = router.query;
  console.log(param);

  useEffect(() => {
    setLoading(true)
    const getContract = async () => {
      const { data } = await axios.get('https://6332ba04a54a0e83d2570a0f.mockapi.io/api/contract-form');
      setContract(data as any);
      setLoading(false)
    };
    getContract();
  }, []);

  return (
    <div>
      {contract1?.map((item: any, index: React.Key | null | undefined) => {
        console.log(item);
        return (
          <>
            <h1 key={index}> </h1>
            <p className="">
              <Link href={`/manager/landlord/${param.id}/contract-form/${item.id}/`}>
                <a  className='bg-cyan-400 text-white rounded-md px-5 py-3  mb-5 hover:bg-cyan-500'>Cập nhật</a>
              </Link>
            </p>

            <ReactQuill value={item?.contract} readOnly={true} theme={'bubble'} className="border mt-5"/>
          </>
        );
      })}
    </div>
  );
};

export default ContractForm;

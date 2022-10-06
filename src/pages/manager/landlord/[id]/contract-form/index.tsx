import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

type Props = {};

const ContractForm = (props: Props) => {
  const [contract1, setContract] = useState([]);
  // console.log(contract1);
  const router = useRouter();
  const param = router.query;
  console.log(param);

  useEffect(() => {
    const getContract = async () => {
      const { data } = await axios.get('https://6332ba04a54a0e83d2570a0f.mockapi.io/api/contract-form');
      setContract(data as any);
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
                <a className="border ">Sửa</a>
              </Link>
            </p>

            <ReactQuill value={item?.contract} readOnly={true} theme={'bubble'} />
          </>
        );
      })}
    </div>
  );
};

export default ContractForm;

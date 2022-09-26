import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const EditHouse = (props: Props) => {
  const router = useRouter();
  const param = router.query;

  console.log('param', param);

  return <div>EditHouse</div>;
};

export default EditHouse;

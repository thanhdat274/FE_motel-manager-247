import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const EditRoom = (props: Props) => {
  const router = useRouter();
  const param = router.query;

  console.log('param', param);

  return <div>EditRoom</div>;
};

export default EditRoom;

import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

const Introduce = (props: Props) => {
  const router = useRouter();

  console.log('fdfd',router.pathname.search('/manager/landlord'));

  return (
    <div className='container'>
      fdfsdf
    </div>
  )
}

export default Introduce
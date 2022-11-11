import { useUserContext } from '@/context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Props = {}

const MessageVerifyEmail = (props: Props) => {
  const { message } = useUserContext();
  return (
    <div className="min-h-[700px] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center clear-both">
      <div className="max-w-2xl w-full space-y-8">
        {message && <div className='w-full flex justify-center flex-col'>
          <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="text-green-500 h-20" />
          <h2 className='text-[25px] mt-10 text-green-500 text-center'>{message}</h2>
          <Link href="https://mail.google.com">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block mt-10">Đi tới email</a>
          </Link>
        </div>}
      </div>
    </div>
  )
}

export default MessageVerifyEmail
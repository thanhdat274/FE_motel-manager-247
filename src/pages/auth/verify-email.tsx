import React from 'react'
import { useRouter } from 'next/router';
import { confirmation } from '../api/auth';
import { Toast } from 'src/hooks/toast';

type Props = {}

const VerifyEmail = (props: Props) => {
    const router = useRouter();
    const param = router.query;
    const onHandleClickConfirmation = async () => {
        await confirmation(param.email, param.token).then((data) => {
            Toast('success', data.data.message);
            router.push('signin');
        }).catch((e) => {
            Toast('error', e?.response?.data?.message);
        })
    }
    return (
        <div className="min-h-[700px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8 text-center">
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Xác nhận Email của bạn</h2>
                    <button onClick={() => onHandleClickConfirmation()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
                        Xác Nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { Toast } from 'src/hooks/toast';
import { returnPayment } from '../api/payment';

const VNpayReturn = () => {

    const router = useRouter();
    const param = router.query;
    const { setLoading, cookies } = useUserContext()

    async function checkReturn() {
        setLoading(true);
        await returnPayment(param).then((result) => {
            setLoading(false);
            if (result.status == 200) {
                Toast('success', 'Sẽ chuyển bạn đến trang thông tin tài khoản sau 2s');
                setTimeout(() => {
                    router.push('/auth/information');
                }, 2000);
            }
            if (result.status == 400) {
                Toast('error', 'Xác thực chữ kí không thành công!');

            }

        }).catch((err) => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (param.vnp_Amount) {
            checkReturn()

        }
    }, [param])


    return (
        <div className='min-h-80vh container mx-auto'>
            vnpay_return
        </div>
    )
}

export default VNpayReturn
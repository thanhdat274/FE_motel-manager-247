import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Toast } from 'src/hooks/toast';
import { getInfoUser } from '../api/auth';
import { checkBillUpdateAccount } from '../api/payment';

const VNpayReturn = () => {
    const router = useRouter();
    const param = router.query;
    const { setLoading, cookies, user, setCookie, setUser } = useUserContext();
    const [saveValue, setSaveValue] = useState(false);
    const userData = cookies?.user;
    console.log('param', param);

    setLoading(true);

    async function checkReturn() {
        setLoading(true);
        await checkBillUpdateAccount(param)
            .then((result) => {
                setLoading(false);
                if (result.status == 200) {
                    Toast('success', 'Sẽ chuyển bạn đến trang thông tin tài khoản sau 2s');
                    // setTimeout(() => {
                    //     router.push('/auth/information');
                    // }, 2000);
                    setSaveValue(true);
                } else {
                    Toast('error', 'Xác thực chữ kí không thành công!');
                }
            })
            .catch((err) => {
                setLoading(false);
            })
            .finally(async () => {
                if (saveValue) {
                    console.log('call api');

                    await getInfoUser(userData?.user._id, userData?.token)
                        .then(({ data }) => {
                            console.log('new data', data);
                        })
                        .catch((error) => {
                            Toast('error', 'Không lấy được dữ liệu mới của người dùng!');
                        });
                }
            });
    }

    useEffect(() => {
        if (param) {
            console.log('vnpay_return', param.vnp_Amount);
            console.log('user', user);

            checkReturn();
        }
    }, [param]);

    return <div className="min-h-80vh container mx-auto">vnpay_return</div>;
};

export default VNpayReturn;

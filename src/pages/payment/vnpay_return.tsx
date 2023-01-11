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

    const [success, setSuccess] = useState(false);

    const checkReturn = async () => {
        setLoading(true);
        await checkBillUpdateAccount(param)
            .then(async (result) => {
                setLoading(false);
                if (result.status == 200) {
                    Toast('success', 'Sẽ chuyển bạn đến trang thông tin tài khoản sau 5s');
                    setTimeout(() => {
                        router.push('/auth/information');
                    }, 5000);
                    setSuccess(true);
                    setSaveValue(true);

                    await getInfoUser(userData?.user._id, userData?.token)
                        .then(({ data }) => {
                            const newData = {
                                token: userData?.token,
                                user: data.data
                            }

                            setCookie('user', JSON.stringify(newData), { path: '/', maxAge: 30 * 24 * 60 * 60 });
                        })
                        .catch((error) => {
                            Toast('error', 'Không lấy được dữ liệu mới của người dùng!');
                        });
                } else {
                    Toast('error', 'Xác thực chữ kí không thành công!');
                }
            })
            .catch((err) => {
                console.log('run');

                setLoading(false);
            })
            .finally(async () => {
                if (saveValue) {

                }
            });
    };

    useEffect(() => {
        if (param) {
            checkReturn();
        }
    }, [param]);

    return (
        <div className="min-h-80vh container mx-auto">
            {success && (
                <div className="py-auto text-2xl text-center mt-6">
                    Nâng cấp tài khoản thành công ! <br />
                    Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!
                </div>
            )}
        </div>
    );
};

export default VNpayReturn;

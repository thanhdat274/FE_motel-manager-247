import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Toast } from 'src/hooks/toast';
import { checkPaymentReturn } from 'src/pages/api/payment';

type Props = {};

const ReturnPayment = (props: Props) => {
    const router = useRouter();
    const param = router.query;
    const { setLoading, cookies, user, setCookie, setUser } = useUserContext();
    const [saveValue, setSaveValue] = useState(false);
    const userData = cookies?.user;
    console.log('param', param);

    console.log('code_room', cookies?.code_room);

    const checkReturn = async () => {
        setLoading(true);
        await checkPaymentReturn(cookies?.code_room?.idHouse, param)
            .then((result) => {
                setLoading(false);

                console.log('result', result);

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
                console.log('run');

                setLoading(false);
            });
    };

    useEffect(() => {
        if (param) {
            checkReturn();
        }
    }, [param]);

    return <div>ReturnPayment</div>;
};

export default ReturnPayment;

import TabPanelComponent from '@/components/TabPanel';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getListBill } from 'src/pages/api/payment';
import PaymentHistory from './payment-history';
import SettingPayment from './setting-payment';

const Payment = () => {
    const router = useRouter();
    const { id } = router.query;
    const [listData, setListData] = useState([]);

    const getReport = async () => {
        await getListBill(id)
            .then(({ data }) => {
                setListData(data?.data);
                // console.log('data', data?.data);
            })
            .catch((err) => {
                console.log('err');
            });
    };

    useEffect(() => {
        if (id) {
            getReport();
        }
    }, []);

    const data = [
        {
            label: 'Lịch sử thanh toán',
            value: 0,
            children: <PaymentHistory listData={listData} />,
        },

        {
            label: 'Cài đặt',
            value: 1,
            children: <SettingPayment />,
        },
    ];
    return (
        <div className="container">
            <h2>Payment History</h2>
            <TabPanelComponent data={data} />
        </div>
    );
};

export default Payment;

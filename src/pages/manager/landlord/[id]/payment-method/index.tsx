import TabPanelComponent from '@/components/TabPanel';
import React from 'react'
import PaymentHistory from './payment-history'
import SettingPayment from './setting-payment';

type Props = {}

const Payment = (props: Props) => {
    const data = [
        {
            label: 'Lịch sử thanh toán',
            value: 0,
            children: <PaymentHistory />
        },

        {
            label: 'Cài đặt',
            value: 1,
            children: <SettingPayment />,
        },

    ];
    return (
        <div className='container'>
            <h2>Payment History</h2>
            <TabPanelComponent data={data} />
        </div>
    )
}

export default Payment
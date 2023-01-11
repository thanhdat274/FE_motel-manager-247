import React from 'react'

type Props = {
    listData?: any,
    filter?: any
}

const PaymentHistory = ({ listData, filter }: Props) => {

    console.log('list ', listData);

    return (
        <div>
            <h2>Payment History</h2>
            <br />
            {
                listData && listData.map((item?: any) =>
                    <p>{item.content}</p>
                )
            }
        </div>
    )
}

export default PaymentHistory
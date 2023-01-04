import React from 'react'

type Props = {
    listData?: any,
    filter?: any
}

const PaymentHistory = ({ listData, filter }: Props) => {
    return (
        <div>
            <h2>Payment History</h2>
            <br />
            {
                listData && listData.map((item?: any) => {
                    <p>{item.name}</p>
                })
            }
        </div>
    )
}

export default PaymentHistory